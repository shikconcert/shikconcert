const { wrap } = require("../lib/wrap");
exports.handler = wrap(() => require("../../api/checkout"));
