// Lets the existing /api/*.js handlers (written as (req, res) functions)
// run as Netlify Functions without changing them. It translates the
// Netlify event into a small req object and collects what the handler
// sends through res.status().json() / res.setHeader().
exports.wrap = (loadHandler) => async (event) => {
  let body = event.body || "";
  if (event.isBase64Encoded) body = Buffer.from(body, "base64").toString("utf8");
  let parsed = {};
  if (body) {
    try { parsed = JSON.parse(body); } catch (e) { parsed = {}; }
  }

  const req = {
    method: event.httpMethod,
    headers: event.headers || {},
    query: event.queryStringParameters || {},
    body: parsed,
  };

  const headers = { "Content-Type": "application/json" };
  let statusCode = 200;
  let payload = "";
  const res = {
    setHeader(k, v) { headers[k] = v; },
    status(c) { statusCode = c; return res; },
    json(obj) { payload = JSON.stringify(obj); return res; },
    end(s) { payload = s || ""; return res; },
  };

  try {
    // Loaded here (not at the top of the file) so a setup problem such as
    // a missing environment variable comes back as a readable message
    // instead of a blank 502 page.
    const handler = loadHandler();
    await handler(req, res);
  } catch (err) {
    console.error("function error:", err);
    statusCode = 500;
    payload = JSON.stringify({
      error: err && err.setup ? err.message : "Server error. Please try again.",
    });
  }
  return { statusCode, headers, body: payload };
};
