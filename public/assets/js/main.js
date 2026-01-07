document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("categoryGrid");
  const vacancySection = document.getElementById("vacancySection");
  const vacancyCard = document.getElementById("vacancyCard");

  if (!grid || !window.CATEGORIES) return;

  // Render category buttons
  grid.innerHTML = window.CATEGORIES.map(cat => `
    <button class="category-btn" data-id="${cat.id}">${cat.name}</button>
  `).join("");

  // Handle category click
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".category-btn");
    if (!btn) return;

    const catId = parseInt(btn.getAttribute("data-id"));
    const selected = window.CATEGORIES.find(c => c.id === catId);
    if (!selected || !selected.vacancy) return;

    const v = selected.vacancy;
    vacancyCard.innerHTML = `
      <div class="category-card">
        <div class="category-title">${selected.name}</div>
        <div class="vacancy">
          <div class="vacancy-title">${v.title} — ${v.company}</div>
          <div class="vacancy-meta">Location: ${v.location} • Salary: ${v.salary}</div>
        </div>
        <div class="actions">
          <button class="apply-btn" data-job-id="${v.jobId}">Apply</button>
          <button class="view-btn" data-job-id="${v.jobId}">View</button>
        </div>
      </div>
    `;
    vacancySection.style.display = "block";
  });

  // Handle Apply/View
  vacancyCard.addEventListener("click", (e) => {
    const applyBtn = e.target.closest(".apply-btn");
    const viewBtn = e.target.closest(".view-btn");
    const jobId = e.target.getAttribute("data-job-id");

    if (applyBtn) {
      const isLoggedIn = Boolean(localStorage.getItem("authToken"));
      if (!isLoggedIn) {
        window.location.href = "signup.html";
      } else {
        window.location.href = `jobs/detail.html?jobId=${jobId}`;
      }
    }

    if (viewBtn) {
      window.location.href = `jobs/detail.html?jobId=${jobId}`;
    }
  });
});