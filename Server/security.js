const crypto = require("crypto");
const jwt = require("jsonwebtoken");
function hashText(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}
function socketTokenVerification(token) {
  var verification;
  try {
    verification = jwt.verify(token, process.env.JWT_TOKEN);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      console.log(e);
    }
  }
}

module.exports = { hashText, socketTokenVerification };
