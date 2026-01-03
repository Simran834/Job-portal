document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("jobseekerForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const errors = [];

    // Collect values
    const name = document.getElementById("full_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const dob = document.getElementById("dob").value;
    const qualification = document.getElementById("qualification").value.trim();
    const about = document.getElementById("about").value.trim();
    const category = document.getElementById("category").value;
    const location = document.getElementById("location").value.trim();
    const salary = document.getElementById("salary").value.trim();
    const availability = document.getElementById("availability").value;
    const skills = document.getElementById("skills").value.trim();
    const resume = document.getElementById("resume").value.trim();
    const coverLetter = document.getElementById("cover_letter").value.trim();
    const certificate = document.getElementById("certificate").value.trim();
    const socialLinks = document.getElementById("social_links").value.trim();

    // Patterns
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    const phonePattern = /^[0-9]{7,15}$/;

    // Validations
    if (name.length < 2) errors.push("Name must be at least 2 characters.");
    if (!emailPattern.test(email)) errors.push("Invalid email address.");
    if (!phonePattern.test(phone)) errors.push("Phone must be 7–15 digits.");
    if (address.length < 5) errors.push("Address must be at least 5 characters.");
    if (!dob) errors.push("Date of Birth is required.");
    if (qualification.length < 2) errors.push("Qualification must be specified.");
    if (about.length < 20) errors.push("About Me must be at least 20 characters.");
    if (!category) errors.push("Please select a preferred category.");
    if (location.length < 2) errors.push("Preferred location must be at least 2 characters.");
    if (salary.length < 3) errors.push("Expected salary must be specified.");
    if (!availability) errors.push("Please select availability.");
    if (skills.length < 2) errors.push("Please enter at least one skill.");
    
    function validatePDF(fieldId, fieldName, required = false) {
  const file = document.getElementById(fieldId).files[0];
  if (!file && required) {
    return `${fieldName} PDF is required.`;
  }
  if (file && file.type !== "application/pdf") {
    return `${fieldName} must be a PDF file.`;
  }
  return null;
}


const resumeError = validatePDF("resume", "Resume", true);
if (resumeError) errors.push(resumeError);

const coverError = validatePDF("cover_letter", "Cover Letter");
if (coverError) errors.push(coverError);

const certError = validatePDF("certificate", "Certificate");
if (certError) errors.push(certError);

const appError = validatePDF("application", "Application");
if (appError) errors.push(appError);


    if (socialLinks) {
      socialLinks.split(",").forEach(link => {
        const trimmed = link.trim();
        if (trimmed) {
          try { new URL(trimmed); } catch { errors.push("Invalid social link: " + trimmed); }
        }
      });
    }

    const out = document.getElementById("jobseekerErrors");

    if (errors.length) {
      out.innerHTML = errors.join("<br>");
      out.className = "error";
    } else {
      // ✅ Build structured profile object
      const profile = {
        full_name: name,
        email,
        phone,
        address,
        dob,
        qualification,
        about,
        preferences: { category, location, expected_salary: salary, availability },
        skills: skills.split(",").map(s => s.trim()),
        documents: { resume, cover_letter: coverLetter, certificate },
        social_links: socialLinks ? socialLinks.split(",").map(l => l.trim()) : []
      };

      // ✅ Render full profile view
      const profileHTML = `
        <div class="profile-view">
          <h3>${profile.full_name}</h3>
          <p><strong>Email:</strong> ${profile.email}</p>
          <p><strong>Phone:</strong> ${profile.phone}</p>
          <p><strong>Address:</strong> ${profile.address}</p>
          <p><strong>Date of Birth:</strong> ${profile.dob}</p>

          <h4>Qualification</h4>
          <p>${profile.qualification}</p>

          <h4>Career Objective</h4>
          <p>${profile.about}</p>

          <h4>Job Preferences</h4>
          <ul>
            <li><strong>Category:</strong> ${profile.preferences.category}</li>
            <li><strong>Location:</strong> ${profile.preferences.location}</li>
            <li><strong>Expected Salary:</strong> ${profile.preferences.expected_salary}</li>
            <li><strong>Availability:</strong> ${profile.preferences.availability}</li>
          </ul>

          <h4>Skills</h4>
          <p>${profile.skills.join(", ")}</p>

          <h4>Documents</h4>
          <ul>
            <li><strong>Resume:</strong> <a href="${profile.documents.resume}" target="_blank">View</a></li>
            <li><strong>Cover Letter:</strong> ${profile.documents.cover_letter ? `<a href="${profile.documents.cover_letter}" target="_blank">View</a>` : "N/A"}</li>
            <li><strong>Certificate:</strong> ${profile.documents.certificate ? `<a href="${profile.documents.certificate}" target="_blank">View</a>` : "N/A"}</li>
          </ul>

          <h4>Social Links</h4>
          <p>${profile.social_links.length ? profile.social_links.map(l => `<a href="${l}" target="_blank">${l}</a>`).join(", ") : "N/A"}</p>
        </div>
      `;

      out.innerHTML = profileHTML;
      out.className = "success";

      // ✅ Later: send to backend API
      // fetch("/api/jobseeker-profile", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(profile)
      // }).then(res => res.json()).then(data => {
      //   console.log("Profile saved:", data);
      // });
    }
  });
});
