document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Not logged in");
    window.location.href = "login.html";
    return;
  }

  // Validate form data before sending
  function validateEducationForm() {
    const institution = document.getElementById("institution").value.trim();
    const degree = document.getElementById("degree").value.trim();
    const field = document.getElementById("field_of_study").value.trim();
    const start = document.getElementById("start_date").value;
    const end = document.getElementById("end_date").value;
    const isCurrent = document.getElementById("is_current").checked;
    const description = document.getElementById("description").value.trim();

    if (!institution || !degree || !field || !start) {
      alert("Institution, degree, field of study, and start date are required.");
      return null;
    }

    if (isNaN(Date.parse(start))) {
      alert("Start date must be a valid date.");
      return null;
    }

    if (end && isNaN(Date.parse(end))) {
      alert("End date must be a valid date.");
      return null;
    }

    return {
      institution,
      degree,
      field_of_study: field,
      start_date: start,
      end_date: end || null,
      is_current: isCurrent,
      description
    };
  }

  // Handle form submission
  document.getElementById("education-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const eduData = validateEducationForm();
    if (!eduData) return; // stop if validation failed

    try {
      const res = await fetch("http://localhost:5050/api/education", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(eduData)
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Failed to add education");
      }

      const result = await res.json();
      alert("Education added successfully!");
      console.log("Added education:", result);

      // Redirect back to profile page
      window.location.href = "jobseeker-profile.html";
    } catch (err) {
      console.error("Error adding education:", err);
      alert("Could not add education. Please try again.");
    }
  });
});
