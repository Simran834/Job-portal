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

    // Validate URLs
    try { new URL(resume); } catch { errors.push("Invalid Resume URL."); }
    if (coverLetter) {
      try { new URL(coverLetter); } catch { errors.push("Invalid Cover Letter URL."); }
    }
    if (certificate) {
      try { new URL(certificate); } catch { errors.push("Invalid Certificate URL."); }
    }

    // Validate social links
    if (socialLinks) {
      socialLinks.split(",").forEach(link => {
        const trimmed = link.trim();
        if (trimmed) {
          try { new URL(trimmed); } catch { errors.push("Invalid social link: " + trimmed); }
        }
      });
    }

    // Output results
    const out = document.getElementById("jobseekerErrors");
    if (errors.length) {
      out.innerHTML = errors.join("<br>");
      out.className = "error";
    } else {
      out.innerHTML = "Job Seeker profile submitted successfully! (connect to backend API here)";
      out.className = "success";

      // TODO: send data to backend API
      // Example:
      // fetch("/api/jobseeker-profile", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     full_name: name,
      //     email,
      //     phone,
      //     address,
      //     dob,
      //     qualification,
      //     about,
      //     category,
      //     location,
      //     salary,
      //     availability,
      //     skills,
      //     resume,
      //     cover_letter: coverLetter,
      //     certificate,
      //     social_links: socialLinks.split(",").map(l => l.trim())
      //   })
      // }).then(res => res.json()).then(data => {
      //   console.log("Profile saved:", data);
      // });
    }
  });
});
