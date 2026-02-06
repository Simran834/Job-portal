document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const urlParams = new URLSearchParams(window.location.search);
  const eduId = urlParams.get("id");

  // Load existing education details
  try {
    const res = await fetch(`http://localhost:5050/api/jobseeker/educations`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const eduList = await res.json();
    const edu = eduList.find(e => e.education_id == eduId);

    if (edu) {
      document.getElementById("institution").value = edu.institution;
      document.getElementById("degree").value = edu.degree;
      document.getElementById("field_of_study").value = edu.field_of_study;
      document.getElementById("start_date").value = edu.start_date.split("T")[0];
      document.getElementById("end_date").value = edu.end_date ? edu.end_date.split("T")[0] : "";
      document.getElementById("description").value = edu.description || "";
    }
  } catch (err) {
    console.error("Error loading education:", err);
    alert("Could not load education details.");
  }

  // Handle update
  document.getElementById("edit-education-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      institution: document.getElementById("institution").value,
      degree: document.getElementById("degree").value,
      field_of_study: document.getElementById("field_of_study").value,
      start_date: document.getElementById("start_date").value,
      end_date: document.getElementById("end_date").value || null,
      description: document.getElementById("description").value
    };

    try {
      const res = await fetch(`http://localhost:5050/api/jobseeker/educations/${eduId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to update education");

      alert("Education updated successfully!");
      window.location.href = "jobseeker-profile.html";
    } catch (err) {
      console.error("Error updating education:", err);
      alert("Could not update education. Try again.");
    }
  });
});
