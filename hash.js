const bcrypt = require('bcrypt');

(async () => {
  const password = "Admin@123"; // your chosen admin password
  const hash = await bcrypt.hash(password, 10); // 10 salt rounds
  console.log("Hashed password:", hash);
})();
