// login.js - Integrated with API Service
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const roleSelect = document.getElementById("role");
  const submitBtn = form?.querySelector('button[type="submit"]');

  if (!form) {
    console.error("login-form not found. Ensure <form id='login-form'> exists.");
    return;
  }

  // Error handling
  function setError(input, message) {
    const errorEl = input.nextElementSibling;
    if (errorEl && errorEl.classList.contains("error-message")) {
      errorEl.textContent = message || "";
      input.setAttribute("aria-invalid", message ? "true" : "false");
    }
  }

  function clearError(input) {
    setError(input, "");
  }

  // Validators
  function validateEmail() {
    const value = emailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setError(emailInput, "Email is required.");
      return false;
    }
    if (!regex.test(value)) {
      setError(emailInput, "Please enter a valid email address.");
      return false;
    }
    clearError(emailInput);
    return true;
  }

  function validatePassword() {
    const value = passwordInput.value;
    if (!value) {
      setError(passwordInput, "Password is required.");
      return false;
    }
    if (value.length < 6) {
      setError(passwordInput, "Password must be at least 6 characters.");
      return false;
    }
    clearError(passwordInput);
    return true;
  }

  function validateRole() {
    const value = roleSelect.value;
    if (!value) {
      setError(roleSelect, "Please select a role.");
      return false;
    }
    clearError(roleSelect);
    return true;
  }

  // Real-time validation
  emailInput?.addEventListener("blur", validateEmail);
  passwordInput?.addEventListener("blur", validatePassword);
  roleSelect?.addEventListener("change", validateRole);

  // Submit handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateEmail() || !validatePassword() || !validateRole()) {
      return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const role = roleSelect.value;

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = "Logging in...";

      // Use apiService for login
      const data = await apiService.login(email, password, role);

      if (data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userId", data.user.id);

        // Redirect based on role
        const role = data.user.role.toLowerCase();
        if (role === "admin") {
          window.location.href = "/admin-panel.html";
        } else if (role === "employer") {
          window.location.href = "/employer-profile.html";
        } else {
          window.location.href = "/jobseeker-profile.html";
        }
      } else {
        alert(data.message || "Login failed");
        submitBtn.disabled = false;
        submitBtn.textContent = "Login";
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message || "Login failed. Please try again.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Login";
    }
  });
});
   