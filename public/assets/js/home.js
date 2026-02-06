// File: assets/js/home.js

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("categoryGrid");
  const vacancySection = document.getElementById("vacancySection");
  const vacancyCard = document.getElementById("vacancyCard");

  // These must match the category values in your database
 const CATEGORIES = [
    { id: 1, name: "IT" },
    { id: 2, name: "HR" },
    { id: 3, name: "Teaching" },
    { id: 4, name: "Hospitality" },
    { id: 5, name: "Banking" },
    { id: 6, name: "Insurance" },
    { id: 7, name: "General Management" },
    { id: 8, name: "Consulting Groups" },
    { id: 9, name: "Aviation" },
    { id: 10, name: "Tourism" },
    { id: 11, name: "Content & Media" },
    { id: 5, name: "Sals & Marketing" }
  ];

  // Render category buttons
  grid.innerHTML = CATEGORIES.map(cat => `
    <button class="category-btn" data-name="${cat.name}">
      ${cat.name.replace("_", " ")}
    </button>
  `).join("");

  // Handle category click
  grid.addEventListener("click", async (e) => {
    const btn = e.target.closest(".category-btn");
    if (!btn) return;

    const categoryName = btn.getAttribute("data-name");

    try {
      const res = await fetch(`http://localhost:5050/api/jobs/category/${encodeURIComponent(categoryName)}`);
      if (!res.ok) throw new Error("Failed to fetch jobs");

      const { jobs } = await res.json();

      // Render jobs inside vacancyCard
      vacancyCard.innerHTML = jobs.length === 0
        ? `<p>No jobs found for ${categoryName.replace("_", " ")}.</p>`
        : jobs.map(job => `
          <div class="category-card">
            <div class="vacancy-title">${job.title} — ${job.employer?.company_name || "Unknown Company"}</div>
            <div class="vacancy-meta">
              Location: ${job.location || "N/A"} • 
              Salary: ${job.salary_min || ""} - ${job.salary_max || ""}
            </div>
            <p>${job.description ? job.description.substring(0, 120) : ""}...</p>
            <div class="actions">
              <button class="apply-btn" data-job-id="${job.job_id}">Apply</button>
              <button class="view-btn" data-job-id="${job.job_id}">View</button>
            </div>
          </div>
        `).join("");

      vacancySection.style.display = "block";
    } catch (err) {
      console.error("Error loading jobs:", err);
      vacancyCard.innerHTML = `<p>Error loading jobs for ${categoryName.replace("_", " ")}.</p>`;
      vacancySection.style.display = "block";
    }
  });
});
