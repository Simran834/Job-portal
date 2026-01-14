// signup.js
const routes = require("./routes.js");

document.addEventListener("DOMContentLoaded", () => {
  // ---- Element references (fail-safe) ----
  const form = document.getElementById("signup-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const roleInput = document.getElementById("role");

  if (!form) {
    console.error("signup-form not found. Ensure <form id='signup-form'> exists.");
    return;
  }
  if (!nameInput || !emailInput || !passwordInput || !roleInput) {
    console.error("One or more inputs (name, email, password, role) not found by id.");
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
  function validateName() {
    const value = nameInput.value.trim();
    if (!value) {
      setError(nameInput, "Name is required.");
      return false;
    }
    if (value.length < 3) {
      setError(nameInput, "Name must be at least 3 characters.");
      return false;
    }
    if (!/^[A-Za-z\s]+$/.test(value)) {
      setError(nameInput, "Name can contain only letters and spaces.");
      return false;
    }
    clearError(nameInput);
    return true;
  }

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
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!value) {
      setError(passwordInput, "Password is required.");
      return false;
    }
    if (!regex.test(value)) {
      setError(
        passwordInput,
        "Min 8 chars, include 1 uppercase, 1 number, and 1 special character."
      );
      return false;
    }
    clearError(passwordInput);
    return true;
  }

  function validateRole() {
    const value = roleInput.value;
    if (!value) {
      setError(roleInput, "Please select a role.");
      return false;
    }
    clearError(roleInput);
    return true;
  }

  // ---- Real-time validation on blur ----
  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  passwordInput.addEventListener("blur", validatePassword);
  roleInput.addEventListener("change", validateRole);

  // ---- Optional: trim on input for name/email ----
  nameInput.addEventListener("input", () => {
    if (nameInput.value.length >= 3) clearError(nameInput);
  });
  emailInput.addEventListener("input", () => {
    clearError(emailInput);
  });

// ---- Submit handling ----
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isRoleValid = validateRole();

  if (!isNameValid || !isEmailValid || !isPasswordValid || !isRoleValid) {
    return;
  }

  // Collect signup data
  const payload = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    password: passwordInput.value,
    role: roleInput.value
  };

  try {
    // Call backend signup API
    const res = await fetch("http://localhost:5050/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Signup failed");
      return;
    }

      const data = result.data;
      // Store token
      if (data.token) localStorage.setItem('token', data.token);

      // Redirect based on role
      if (payload.role === 'jobseeker') {
        window.location.href = '../signup-jobseeker.html';
      } else if (payload.role === 'employer') {
        window.location.href = '../signup-employer.html';
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Server error during signup');
    }
});
});


//   // ---- Submit handling ----
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const isNameValid = validateName();
//     const isEmailValid = validateEmail();
//     const isPasswordValid = validatePassword();
//     const isRoleValid = validateRole();

//     // Stop if any validation fails
//     if (!isNameValid || !isEmailValid || !isPasswordValid || !isRoleValid) {
//       return;
//     }

//     // ---- Redirect based on role ----
//     const role = roleInput.value;
//     if (role === "jobseeker") {
//       window.location.href = "signup-jobseeker.html";
//     } else if (role === "employer") {
//       window.location.href = "signup-employer.html";
//     } else {
//       // Safety fallback; shouldn't hit if role validator passes
//       setError(roleInput, "Unsupported role selected.");
//     }
//   });
// });
