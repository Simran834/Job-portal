document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("employerForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const errors = [];

    // Collect values
    const companyName = document.getElementById("company_name").value.trim();
    const industry = document.getElementById("industry").value.trim();
    const location = document.getElementById("location").value.trim();
    const website = document.getElementById("website").value.trim();
    const contactName = document.getElementById("contact_name").value.trim();
    const contactEmail = document.getElementById("contact_email").value.trim();
    const contactPhone = document.getElementById("contact_phone").value.trim();
    const about = document.getElementById("about").value.trim();

    // Patterns
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    const phonePattern = /^[0-9]{7,15}$/;

    // Validations
    if (companyName.length < 2) errors.push("Company name must be at least 2 characters.");
    if (industry.length < 2) errors.push("Industry must be specified.");
    if (location.length < 2) errors.push("Location must be specified.");
    if (website) {
      try { new URL(website); } catch { errors.push("Invalid website URL."); }
    }
    if (contactName.length < 2) errors.push("Contact person name must be at least 2 characters.");
    if (!emailPattern.test(contactEmail)) errors.push("Invalid contact email address.");
    if (!phonePattern.test(contactPhone)) errors.push("Contact phone must be 7–15 digits.");
    if (about.length < 20) errors.push("About Company must be at least 20 characters.");

    const out = document.getElementById("employerErrors");

    if (errors.length) {
      out.innerHTML = errors.join("<br>");
      out.className = "error";
    } else {
      out.innerHTML = "Employer profile submitted successfully!";
      out.className = "success";

      // ✅ Build structured profile object
      const profile = {
        company_name: companyName,
        industry,
        location,
        website,
        contact: {
          name: contactName,
          email: contactEmail,
          phone: contactPhone
        },
        about
      };

      console.log("Employer Profile Object:", profile);

      // ✅ Render profile preview
      const preview = `
        <h3>Profile Preview</h3>
        <p><strong>Company Name:</strong> ${profile.company_name}</p>
        <p><strong>Industry:</strong> ${profile.industry}</p>
        <p><strong>Location:</strong> ${profile.location}</p>
        <p><strong>Website:</strong> ${profile.website || "N/A"}</p>
        <p><strong>Contact Person:</strong> ${profile.contact.name}</p>
        <p><strong>Contact Email:</strong> ${profile.contact.email}</p>
        <p><strong>Contact Phone:</strong> ${profile.contact.phone}</p>
        <p><strong>About Company:</strong> ${profile.about}</p>
      `;

      out.innerHTML = preview;
      out.className = "success";

      // ✅ Later: send to backend API
      // fetch("/api/employer-profile", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(profile)
      // }).then(res => res.json()).then(data => {
      //   console.log("Profile saved:", data);
      // });
    }
  });
});
