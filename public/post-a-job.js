document.addEventListener('DOMContentLoaded', function () {
    // Get the form and container elements
    const postJobForm = document.getElementById('postJobForm');
    const jobList = document.getElementById('jobList');
    const industrySelect = document.getElementById('industry');

    // Example job categories (can be fetched from backend)
    const jobCategories = [
      "IT & Software",
      "Finance",
      "Education",
      "Healthcare",
      "Engineering",
      "Sales & Marketing",
      "Hospitality",
      "Construction",
      "Design",
      "Legal",
      "Other"
    ];

    // Populate job categories dropdown
    if (industrySelect) {
        jobCategories.forEach(function (jobCategory) {
            const option = document.createElement('option');
            option.value = jobCategory;
            option.textContent = jobCategory;
            industrySelect.appendChild(option);
        });
    }

    // Handle form submission
    if (postJobForm) {
        postJobForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const title = document.getElementById('jobTitle').value.trim();
            const company = document.getElementById('companyName').value.trim();
            const location = document.getElementById('jobLocation').value.trim();
            const description = document.getElementById('jobDescription').value.trim();
            const industry = industrySelect ? industrySelect.value : '';

            // Simple validation
            if (!title || !company || !location || !description || !industry) {
                alert('Please fill in all fields.');
                return;
            }

            // Create job card
            const jobCard = document.createElement('div');
            jobCard.className = 'job-card';
            jobCard.innerHTML = `
                <h3>${title}</h3>
                <p><strong>Company:</strong> ${company}</p>
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Category:</strong> ${industry}</p>
                <p>${description}</p>
            `;

            // Append job card to job list
            if (jobList) {
                jobList.appendChild(jobCard);
            }

            // Reset form
            postJobForm.reset();
        });
    }
});

// homepage link garda yo add vako chha dhyan dine
// employersprofile.js
//apply now click garey paxi applied vanne message diney
