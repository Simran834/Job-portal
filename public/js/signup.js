document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  if (!signupForm) return;

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const errors = [];

    // Collect values
    const name = document.getElementById("full_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm_password").value.trim();
    const role = document.getElementById("role").value;

    // Patterns
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    const strongPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

    // Validations
    if (name.length < 2) errors.push("Name must be at least 2 characters.");
    if (!emailPattern.test(email)) errors.push("Invalid email address.");
    if (!strongPass.test(password)) {
      errors.push("Password must be 8+ characters with letters, numbers, and special characters.");
    }
    if (password !== confirmPassword) errors.push("Passwords do not match.");
    if (!role) errors.push("Please select a role.");

    // Output errors or redirect
    const out = document.getElementById("signupErrors");
    if (errors.length) {
      out.innerHTML = errors.join("<br>");
      out.className = "error";
    } else {
      // Redirect based on role
      if (role === "job_seeker") {
        window.location.href = "jobseeker.html";
      } else if (role === "employer") {
        window.location.href = "employer.html";
      } else {
        out.textContent = "Please select a valid role.";
        out.className = "error";
      }
    }
  });
});
