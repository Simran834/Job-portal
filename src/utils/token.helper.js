const jwt = require("jsonwebtoken");

// Decode token safely
function decodeToken(token) {
  try {
    const payload = jwt.decode(token); // no verification, just decode
    return payload; // { id, role, ... }
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
}

module.exports = { decodeToken };
