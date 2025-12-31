document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("employerProfileForm");
  const errorDiv = document.getElementById("errorMessages");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop submission until validated
    let errors = [];

    // Collect values
    const companyName = document.getElementById("company_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const website = document.getElementById("website").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const logo = document.getElementById("company_logo").value.trim();
    const certificate = document.getElementById("registration_certificate").value.trim();
    const description = document.getElementById("description").value.trim();
    const socialLinks = document.getElementById("social_links").value.trim();

    // Company Name
    if (companyName.length < 2) {
      errors.push("Company name must be at least 2 characters long.");
    }

    // Email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    if (!email.match(emailPattern)) {
      errors.push("Please enter a valid email address.");
    }

    // Password validation (8+ chars, letters, numbers, special chars)
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
    if (!password.match(passwordPattern)) {
      errors.push("Password must be at least 8 characters long and include letters, numbers, and special characters.");
    }

    // Website validation
    try { new URL(website); } catch { errors.push("Please enter a valid website URL."); }

    // Phone validation (digits only, 7–15 length)
    const phonePattern = /^[0-9]{7,15}$/;
    if (!phone.match(phonePattern)) {
      errors.push("Phone must contain only digits (7–15 characters).");
    }

    // Address
    if (address.length < 5) {
      errors.push("Address must be at least 5 characters long.");
    }

    // Logo URL
    try { new URL(logo); } catch { errors.push("Please enter a valid company logo URL."); }

    // Registration Certificate URL
    try { new URL(certificate); } catch { errors.push("Please enter a valid registration certificate URL."); }

    // Description
    if (description.length < 20) {
      errors.push("Company description must be at least 20 characters long.");
    }

    // Social Links (comma separated URLs)
    if (socialLinks) {
      const links = socialLinks.split(",");
      links.forEach(link => {
        try { new URL(link.trim()); } catch { errors.push("Invalid social link: " + link); }
      });
    }

    // Show errors or success
    if (errors.length > 0) {
      errorDiv.innerHTML = errors.join("<br>");
      errorDiv.style.color = "red";
    } else {
      errorDiv.innerHTML = "Profile submitted successfully!";
      errorDiv.style.color = "green";
      // Proceed with submission (AJAX or backend call)
      // form.submit(); // uncomment if you want normal submission
    }
  });
});
