document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("vacancyForm");
  const messageBox = document.getElementById("vacancyMessage");
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Not logged in");
    window.location.href = "login.html";
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const jobData = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      location: document.getElementById("location").value,
      salary_min: document.getElementById("salary_min").value,
      salary_max: document.getElementById("salary_max").value,
      job_type: document.getElementById("job_type").value,
      experience_level: document.getElementById("experience_level").value,
      work_mode: document.getElementById("work_mode").value,
      category: document.getElementById("JobCategory").value,
      application_deadline: document.getElementById("application_deadline").value,
    };

    try {
      const res = await fetch("http://localhost:5050/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(jobData)
      });

      const data = await res.json();

      if (res.ok) {
        messageBox.innerText = "Job posted successfully!";
        messageBox.style.color = "green";

        // Redirect back to employer profile after 2 seconds
        setTimeout(() => {
          window.location.href = "employer-profile.html";
        }, 2000);
      } else {
        messageBox.innerText = data.message || "Error posting job";
        messageBox.style.color = "red";
      }
    } catch (err) {
      console.error("Error posting job:", err);
      messageBox.innerText = "Something went wrong!";
      messageBox.style.color = "red";
    }
  });
});
