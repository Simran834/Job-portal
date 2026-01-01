document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const errors = [];
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
      if (!emailPattern.test(email)) errors.push("Enter a valid email address.");

      const strongPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
      if (!strongPass.test(password)) {
        errors.push("Password must be 8+ characters with letters, numbers, and special characters.");
      }

      const out = document.getElementById("loginErrors");
      if (errors.length) {
        out.innerHTML = errors.join("<br>");
        out.className = "error";
      } else {
        out.innerHTML = "Login successful! (connect to backend API here)";
        out.className = "success";
      }
    });
  }
});
