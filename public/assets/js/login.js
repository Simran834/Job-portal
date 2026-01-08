// login.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (!form) {
    console.error("login-form not found. Ensure <form id='login-form'> exists.");
    return;
  }

  // ---- Utilities for error display ----
  function getErrorEl(input) {
    const id = `${input.id}-error`;
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("small");
      el.id = id;
      el.style.color = "red";
      el.style.display = "block";
      el.style.marginTop = "4px";
      input.insertAdjacentElement("afterend", el);
    }
    return el;
  }

  function setError(input, message) {
    const errorEl = getErrorEl(input);
    errorEl.textContent = message || "";
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function clearError(input) {
    setError(input, "");
  }

  // ---- Field validators ----
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
    clearError(passwordInput);
    return true;
  }

  // ---- Real-time validation ----
  emailInput.addEventListener("blur", validateEmail);
  passwordInput.addEventListener("blur", validatePassword);

  // ---- Submit handling ----
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    const payload = {
      email: emailInput.value.trim(),
      password: passwordInput.value
    };

    try {
      const res = await fetch("http://localhost:5050/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ Store token and role
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);

      // ✅ Redirect based on role
      if (data.user.role === "jobseeker") {
        window.location.href = "jobseeker-profile.html";
      } else if (data.user.role === "employer") {
        window.location.href = "employer-profile.html";
      } else {
        alert("Unsupported role");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error during login");
    }
  });
});
