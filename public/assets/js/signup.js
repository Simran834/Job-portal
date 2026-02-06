// signup.js - Integrated with API Service
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const successBox = document.getElementById("successBox");
  const successMessage = document.getElementById("successMessage");
  const loginBtn = document.getElementById("loginBtn");
  const submitBtn = form?.querySelector('button[type="submit"]');

  if (!form) {
    console.error("signupForm not found");
    return;
  }

  // Validators
  function validateName(value) {
    return value.trim().length >= 2;
  }

  function validateEmail(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  }

  function validatePassword(value) {
    return value.length >= 6;
  }

  // Submit handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const roleInput = document.getElementById("role");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const role = roleInput.value;

    // Validate
    if (!validateName(name)) {
      alert("Name must be at least 2 characters");
      return;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email");
      return;
    }
    if (!validatePassword(password)) {
      alert("Password must be at least 6 characters");
      return;
    }
    if (!role) {
      alert("Please select a role");
      return;
    }

    const formData = { name, email, password, role };

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = "Signing up...";

      const data = await apiService.signup(formData);

      if (data.token) {
        // Store token for auto-login after signup
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userId", data.user.id);

        // Show success message
        successMessage.innerText =
          "Signed up successfully! You'll be redirected to login.";
        successBox.style.display = "block";

        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = "/login.html";
        }, 2000);
      } else {
        alert(data.message || "Signup failed");
        submitBtn.disabled = false;
        submitBtn.textContent = "Continue";
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.message || "Signup failed. Please try again.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Continue";
    }
  });

  // Login button click
  loginBtn?.addEventListener("click", () => {
    window.location.href = "/login.html";
  });
});
