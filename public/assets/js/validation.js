// validation.js

// Utility: show error message below field
function showError(input, message) {
  let errorElem = input.nextElementSibling;
  if (!errorElem || !errorElem.classList.contains("error-message")) {
    errorElem = document.createElement("div");
    errorElem.className = "error-message";
    input.parentNode.insertBefore(errorElem, input.nextSibling);
  }
  errorElem.textContent = message;
  errorElem.style.color = "red";
  errorElem.style.fontSize = "0.9rem";
  errorElem.style.marginTop = "0.3rem";
}

// Utility: clear error
function clearError(input) {
  let errorElem = input.nextElementSibling;
  if (errorElem && errorElem.classList.contains("error-message")) {
    errorElem.textContent = "";
  }
}

// Username validation: at least 8 characters, only digits (no letters or special chars)
function validateUsername(usernameInput) {
  if (!usernameInput) return true; // skip if not present (login form)
  const value = usernameInput.value.trim();
  const regex = /^[0-9]{8,}$/; // only digits, min 8
  if (!regex.test(value)) {
    showError(usernameInput, "Username must be at least 8 digits, no letters or special characters.");
    return false;
  }
  clearError(usernameInput);
  return true;
}

// Email validation: standard format
function validateEmail(emailInput) {
  const value = emailInput.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(value)) {
    showError(emailInput, "Please enter a valid email address (e.g., user@example.com).");
    return false;
  }
  clearError(emailInput);
  return true;
}

// Password validation: at least 8 chars, one uppercase, one lowercase, one digit, one special char
function validatePassword(passwordInput) {
  const value = passwordInput.value.trim();
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
  if (!regex.test(value)) {
    showError(passwordInput, "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.");
    return false;
  }
  clearError(passwordInput);
  return true;
}

// Attach validation to forms
function attachValidation(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", function (e) {
    let valid = true;

    const usernameInput = form.querySelector("#username");
    if (usernameInput) valid = validateUsername(usernameInput) && valid;

    const emailInput = form.querySelector("#email");
    if (emailInput) valid = validateEmail(emailInput) && valid;

    const passwordInput = form.querySelector("#password");
    if (passwordInput) valid = validatePassword(passwordInput) && valid;

    if (!valid) e.preventDefault(); // stop form submission
  });
}

// Initialize for both signup and login
document.addEventListener("DOMContentLoaded", function () {
  attachValidation("signup-form");
  attachValidation("login-form");
});

const roleInput = form.querySelector("#role");
if (roleInput && roleInput.value === "") {
  showError(roleInput, "Please select a role.");
  valid = false;
} else if (roleInput) {
  clearError(roleInput);
}