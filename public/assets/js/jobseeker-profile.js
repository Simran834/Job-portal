document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Not logged in");
    window.location.href = "login.html";
    return;
  }


  // Utility function for fetching with token + error handling
  // ✅ Keep General Info untouched 
  async function fetchData(url) {
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.error("Fetch error:", err);
      // alert("Error loading data. Please try again.");
      return [];
    }
  }

  try {
    // 1. General Information (basic profile)
    const res = await fetch("http://localhost:5050/api/jobseeker/get", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    console.log("API response:", data);

    if (data.profile) {
      const p = data.profile;
      document.getElementById("general-info").innerHTML = `
        <p><strong>Name:</strong> ${p.seeker_name}</p>
        <p><strong>Email:</strong> ${p.user.email}</p>
        <p><strong>Phone:</strong> ${p.phone}</p>
        <p><strong>Address:</strong> ${p.address}</p>
        <p><strong>Bio:</strong> ${p.bio}</p>
        <p><strong>Current Position:</strong> ${p.current_position || "-"}</p>
        <p><strong>Current Salary:</strong> ${p.current_salary || "-"}</p>
        <p><strong>Expected Salary:</strong> ${p.expected_salary || "-"}</p>
        <p><strong>Open to Work:</strong> ${p.is_open_to_work ? "Yes" : "No"}</p>
        <p><strong>Account Created:</strong> ${new Date(p.user.createdAt).toLocaleDateString()}</p>
        <p><strong>Role:</strong> ${p.user.role}</p>
      `;
    }

    // 2. Education
    await loadEducation(token);
  async function loadEducation(token) {
  try {
    const res = await fetch("http://localhost:5050/api/education", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch education");

    const { educations } = await res.json();

    if (!educations || educations.length === 0) {
      document.getElementById("education-list").innerHTML = "<li>No education records found.</li>";
      return;
    }

    document.getElementById("education-list").innerHTML = educations.map(e => `
      <li data-id="${e.education_id}">
        <strong>${e.degree}</strong> in ${e.field_of_study} — ${e.institution}<br>
        (${new Date(e.start_date).toLocaleDateString()} 
        to ${e.is_current ? "Present" : (e.end_date ? new Date(e.end_date).toLocaleDateString() : "N/A")})<br>
        ${e.description || ""}
      </li>
    `).join("");
  } catch (err) {
    console.error("Error loading education:", err);
    document.getElementById("education-list").innerHTML = "<li>Error loading education data.</li>";
  }
}


       // 3. Experience
    async function loadExperiences(token) {
      try {
        const res = await fetch("http://localhost:5050/api/experience", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch experiences");

        const { experiences } = await res.json();

        if (!experiences || experiences.length === 0) {
          document.getElementById("experience-list").innerHTML = "<li>No experiences found.</li>";
          return;
        }

        document.getElementById("experience-list").innerHTML = experiences.map(ex => `
          <li data-id="${ex.experience_id}">
            <strong>${ex.job_title}</strong> at ${ex.company_name}<br>
            (${new Date(ex.start_date).toLocaleDateString()} 
            to ${ex.is_current ? "Present" : (ex.end_date ? new Date(ex.end_date).toLocaleDateString() : "N/A")})<br>
            ${ex.description || ""}
          </li>
        `).join("");
      } catch (err) {
        console.error("Error loading experiences:", err);
        document.getElementById("experience-list").innerHTML = "<li>Error loading experiences.</li>";
      }
    }

    await loadExperiences(token);

    // Experience buttons
    document.getElementById("add-exp-btn").addEventListener("click", () => {
      window.location.href = "experience-form.html";
    });

    document.getElementById("update-exp-btn").addEventListener("click", () => {
      const firstExp = document.querySelector("#experience-list li");
      if (!firstExp) {
        alert("No experience record to update.");
        return;
      }
      const expId = firstExp.getAttribute("data-id");
      window.location.href = `edit-experience.html?id=${expId}`;
    });

    document.getElementById("delete-exp-btn").addEventListener("click", async () => {
      const firstExp = document.querySelector("#experience-list li");
      if (!firstExp) {
        alert("No experience record to delete.");
        return;
      }
      const expId = firstExp.getAttribute("data-id");

      if (confirm("Are you sure you want to delete this experience entry?")) {
        try {
          const res = await fetch(`http://localhost:5050/api/experience/${expId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          });
          if (!res.ok) throw new Error("Failed to delete experience");
          alert("Experience deleted successfully!");
          await loadExperiences(token); // refresh list
        } catch (err) {
          console.error("Error deleting experience:", err);
          alert("Could not delete experience.");
        }
      }
    });

    // 4. Skills
    async function loadSkills(token) {
      try {
        const res = await fetch("http://localhost:5050/api/skill", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch skills");

        const { skills } = await res.json();

        if (!skills || skills.length === 0) {
          document.getElementById("skills-list").innerHTML = "<li>No skills found.</li>";
          return;
        }

        document.getElementById("skills-list").innerHTML = skills.map(s => `
          <li data-id="${s.skill_id}">
            ${s.name} (${s.proficiency})
          </li>
        `).join("");
      } catch (err) {
        console.error("Error loading skills:", err);
        document.getElementById("skills-list").innerHTML = "<li>Error loading skills.</li>";
      }
    }

    await loadSkills(token);

    // Skill buttons
    document.getElementById("add-skill-btn").addEventListener("click", () => {
      window.location.href = "skills-form.html";
    });

    document.getElementById("update-skill-btn").addEventListener("click", () => {
      const firstSkill = document.querySelector("#skills-list li");
      if (!firstSkill) {
        alert("No skill to update.");
        return;
      }
      const skillId = firstSkill.getAttribute("data-id");
      window.location.href = `edit-skill.html?id=${skillId}`;
    });

    document.getElementById("delete-skill-btn").addEventListener("click", async () => {
      const firstSkill = document.querySelector("#skills-list li");
      if (!firstSkill) {
        alert("No skill to delete.");
        return;
      }
      const skillId = firstSkill.getAttribute("data-id");

      if (confirm("Are you sure you want to delete this skill?")) {
        try {
          const res = await fetch(`http://localhost:5050/api/skill/${skillId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          });
          if (!res.ok) throw new Error("Failed to delete skill");
          alert("Skill deleted successfully!");
          await loadSkills(token); // refresh list
        } catch (err) {
          console.error("Error deleting skill:", err);
          alert("Could not delete skill.");
        }
      }
    });

   
  
      // 5. Social Links
    async function loadSocialLink() {
  const res = await fetch("http://localhost:5050/api/sociallink", {
    headers: { Authorization: `Bearer ${token}` }
  });
  const { socialLinks } = await res.json();
  const link = socialLinks.find(l => l.link_id == linkId);

  if (!link) {
    alert("Social link not found.");
    return;
  }

  document.getElementById("platform").value = link.platform;
  document.getElementById("url").value = link.url;
}


    // Social Link buttons
    document.getElementById("add-sociallink-btn").addEventListener("click", () => {
      window.location.href = "sociallink-form.html";
    });

    document.getElementById("update-sociallink-btn").addEventListener("click", () => {
      const firstLink = document.querySelector("#sociallink-list li");
      if (!firstLink) {
        alert("No social link to update.");
        return;
      }
      const linkId = firstLink.getAttribute("data-id");
      window.location.href = `edit-sociallink.html?id=${linkId}`;
    });

    document.getElementById("delete-sociallink-btn").addEventListener("click", async () => {
      const firstLink = document.querySelector("#sociallink-list li");
      if (!firstLink) {
        alert("No social link to delete.");
        return;
      }
      const linkId = firstLink.getAttribute("data-id");

      if (confirm("Are you sure you want to delete this social link?")) {
        try {
          const res = await fetch(`http://localhost:5050/api/sociallink/${linkId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          });
          if (!res.ok) throw new Error("Failed to delete social link");
          alert("Social link deleted successfully!");
          await loadSocialLinks(token); // refresh list
        } catch (err) {
          console.error("Error deleting social link:", err);
          alert("Could not delete social link.");
        }
      }
    });



    // Edit Profile button
    document.getElementById("edit-profile-btn").addEventListener("click", () => {
      window.location.href = "edit-profile.html";
    });

  } catch (err) {
    console.error("Profile load error:", err);
    alert("Server error while loading profile");
  }

  // ✅ Logout button
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "login.html";
  });
});
