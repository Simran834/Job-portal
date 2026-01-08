// Utility: show error inline
export function showError(inputId, message) {
  let errorEl = document.querySelector(`#${inputId}-error`);
  if (!errorEl) {
    errorEl = document.createElement("small");
    errorEl.id = `${inputId}-error`;
    errorEl.style.color = "red";
    errorEl.style.display = "block";
    const input = document.getElementById(inputId);
    input.insertAdjacentElement("afterend", errorEl);
  }
  errorEl.textContent = message;
}

export function clearError(inputId) {
  const errorEl = document.querySelector(`#${inputId}-error`);
  if (errorEl) errorEl.textContent = "";
}

// Validations
export function validateEmail(email, inputId = "email") {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showError(inputId, "Email is required");
    return false;
  }
  if (!regex.test(email)) {
    showError(inputId, "Invalid email format");
    return false;
  }
  clearError(inputId);
  return true;
}

export function validatePassword(password, inputId = "password") {
  if (!password) {
    showError(inputId, "Password is required");
    return false;
  }
  if (password.length < 6) {
    showError(inputId, "Password must be at least 6 characters");
    return false;
  }
  clearError(inputId);
  return true;
}

export function validateUsername(name, inputId = "name") {
  if (!name) {
    showError(inputId, "Name is required");
    return false;
  }
  if (name.length < 2) {
    showError(inputId, "Name must be at least 2 characters");
    return false;
  }
  clearError(inputId);
  return true;
}

export function validateRole(role, inputId = "role") {
  if (!role) {
    showError(inputId, "Role selection is required");
    return false;
  }
  clearError(inputId);
  return true;
}
