// employer-form.js
document.getElementById("employerProfileForm").addEventListener("submit", function(event) {
  event.preventDefault(); // stop form submission until validated

  let errors = [];
  let companyName = document.getElementById("company_name").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let website = document.getElementById("website").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let address = document.getElementById("address").value.trim();
  let logo = document.getElementById("company_logo").value.trim();
  let certificate = document.getElementById("registration_certificate").value.trim();
  let description = document.getElementById("description").value.trim();
  let socialLinks = document.getElementById("social_links").value.trim();

  // Company Name
  if (companyName.length < 2) {
    errors.push("Company name must be at least 2 characters.");
  }

  // Email validation
  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
  if (!email.match(emailPattern)) {
    errors.push("Please enter a valid email address.");
  }

  // Password validation (8+ chars, mix of letters, numbers, special chars)
  let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
  if (!password.match(passwordPattern)) {
    errors.push("Password must be at least 8 characters long and include letters, numbers, and special characters.");
  }

  // Website validation
  try { new URL(website); } catch { errors.push("Please enter a valid website URL."); }

  // Phone validation (basic digits check)
  let phonePattern = /^[0-9]{7,15}$/;
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
    let links = socialLinks.split(",");
    links.forEach(link => {
      try { new URL(link.trim()); } catch { errors.push("Invalid social link: " + link); }
    });
  }

  // Show errors or submit
  let errorDiv = document.getElementById("errorMessages");
  if (errors.length > 0) {
    errorDiv.innerHTML = errors.join("<br>");
    errorDiv.style.color = "red";
  } else {
    errorDiv.innerHTML = "Profile submitted successfully!";
    errorDiv.style.color = "green";
    // Proceed with submission (AJAX or backend call)
    // this.submit(); // uncomment if you want normal submission
  }
});

