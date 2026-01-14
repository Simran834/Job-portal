const api = require("./api.js");
const { validateEmail, validatePassword, validateRole } = require("./validators.js");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  if (!form) return;

  // Utility: show custom alert box
  function showAlert(message, type = "success") {
    let alertBox = document.getElementById("custom-alert");
    if (!alertBox) {
      alertBox = document.createElement("div");
      alertBox.id = "custom-alert";
      alertBox.className = "alert-box";
      document.body.appendChild(alertBox);
    }

    alertBox.textContent = message;
    alertBox.style.backgroundColor = type === "success" ? "#4CAF50" : "#f44336"; // green or red
    alertBox.style.display = "block";

    // Hide after 2 seconds
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 2000);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    // Run validations
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    const roleErr = validateRole(role);

    if (emailErr || passErr || roleErr) {
      showAlert(emailErr || passErr || roleErr, "error");
      return;
    }

    // Call backend
    const { ok, data } = await api.post("/auth/login", { email, password, role });

    if (!ok) {
      showAlert(data.message || "Login failed", "error");
      return;
    }

    // Save token + role
    localStorage.setItem("token", data.token);
    const roleValue = data.user?.role || data.role || '';
    localStorage.setItem('role', roleValue);

    // Show success alert
    showAlert("Login successful!", "success");

    // Redirect after short delay
    setTimeout(() => {
      const r = roleValue;
      if (r === "ADMIN") {
        window.location.href = "admin-panel.html";
      } else if (r === "EMPLOYER") {
        window.location.href = "employer-profile.html";
      } else {
        window.location.href = "jobseeker-profile.html";
      }
    }, 2000);
  });
});