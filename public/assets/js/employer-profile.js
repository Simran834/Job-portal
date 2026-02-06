document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Not logged in");
    window.location.href = "login.html";
    return;
  }

  // ---------------------------
  // Load Employer Profile
  // ---------------------------
  try {
    const res = await fetch("http://localhost:5050/api/employer/profile", {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Failed to fetch employer profile");

    const employer = await res.json();

    // Populate frontend fields
    document.getElementById("companyName").innerText =
      employer.company_name || "N/A";
    document.getElementById("companyWebsite").innerText =
      employer.website || "N/A";
    document.getElementById("companyPhone").innerText =
      employer.phone || "N/A";
    document.getElementById("companyAddress").innerText =
      employer.address || "N/A";
    document.getElementById("companyDescription").innerText =
      employer.description || "N/A";

    if (employer.company_logo) {
      document.getElementById("companyLogo").src = employer.company_logo;
    } else {
      document.getElementById("companyLogo").src =
        "assets/images/default-logo.png";
    }
  } catch (err) {
    console.error("Error loading employer profile:", err);
    alert("Could not load employer profile.");
  }

  // ---------------------------
  // Post Vacancy Button
  // ---------------------------
  document
    .getElementById("postVacancyBtn")
    .addEventListener("click", () => {
      window.location.href = "vacancy-form.html";
    });

  // ---------------------------
  // Load Employer Jobs
  // ---------------------------
  async function loadEmployerJobs() {
    try {
      const res = await fetch("http://localhost:5050/api/jobs/employer", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to fetch employer jobs");

      const { jobs } = await res.json();
      const list = document.getElementById("vacancyList");

      if (!jobs || jobs.length === 0) {
        list.innerHTML = "<li>No vacancies posted yet.</li>";
        return;
      }

      list.innerHTML = jobs
        .map(
          (job) => `
        <li>
          <strong>${job.title}</strong> — ${job.location}<br>
          <small>${job.category} | ${job.job_type} | Deadline: ${
            job.application_deadline
              ? new Date(job.application_deadline).toLocaleDateString()
              : "N/A"
          }</small>
        </li>
      `
        )
        .join("");
    } catch (err) {
      console.error("Error loading employer jobs:", err);
      document.getElementById("vacancyList").innerHTML =
        "<li>Error loading vacancies.</li>";
    }
  }

  // Call jobs loader on page load
  loadEmployerJobs();

async function loadEmployerApplications() {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch("http://localhost:5050/api/jobs/applications", {
      headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await res.json();
    const container = document.getElementById("employer-applications");
    container.innerHTML = "";

    data.jobs.forEach(job => {
      const jobBlock = document.createElement("div");
      jobBlock.innerHTML = `
        <h3>${job.title}</h3>
        <ul>
          ${job.applications.map(app => `
            <li>${app.job_seeker.seeker_name} - ${app.status}</li>
          `).join("")}
        </ul>
      `;
      container.appendChild(jobBlock);
    });
  } catch (err) {
    console.error("Error loading employer applications:", err);
  }
}

//  Load applications when employer profile opens
document.addEventListener("DOMContentLoaded", loadEmployerApplications);


});
