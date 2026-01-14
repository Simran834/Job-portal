const api = require("./api.js");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("jobseeker-form");

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      window.location.href = "login.html";
      return;
    }

    // Collect form values
    const payload = {
      seeker_name: document.getElementById("seeker_name").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      address: document.getElementById("address").value.trim(),
      bio: document.getElementById("bio").value.trim(),
      current_position: document.getElementById("current_position").value.trim(),
      current_salary: document.getElementById("current_salary").value,
      expected_salary: document.getElementById("expected_salary").value,
      is_open_to_work: document.getElementById("is_open_to_work").checked
    };

    // ✅ Call saveProfile endpoint
    const { ok, data } = await api.post("/api/jobseeker/create", payload, token);

    if (!ok) {
      alert(data.message || "Error saving profile");
      return;
    }

    // Store profile locally for profile page rendering
    localStorage.setItem("jobseekerProfile", JSON.stringify(data.profile));

    alert("Profile saved successfully!");
    window.location.href = "jobseeker-profile.html";
  });
});





// import { api } from "./api.js";

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("jobseeker-form");

//   form.addEventListener("submit", async e => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Please login first");
//       window.location.href = "login.html";
//       return;
//     }

//     // Clear previous errors
//     form.querySelectorAll(".error-message").forEach(el => el.textContent = "");

//     let isValid = true;

//     // Full Name
//     const seekerName = document.getElementById("seeker_name");
//     if (!seekerName.value.trim()) {
//       seekerName.nextElementSibling.textContent = "Full name is required.";
//       isValid = false;
//     }

//     // Phone
//     const phone = document.getElementById("phone");
//     const phonePattern = /^\+977-9[0-9]{8}$/; // Example: +977-98xxxxxxx
//     if (!phone.value.trim()) {
//       phone.nextElementSibling.textContent = "Phone number is required.";
//       isValid = false;
//     } else if (!phonePattern.test(phone.value.trim())) {
//       phone.nextElementSibling.textContent = "Enter a valid Nepali phone number (+977-98xxxxxxx).";
//       isValid = false;
//     }

//     // Address
//     const address = document.getElementById("address");
//     if (!address.value.trim()) {
//       address.nextElementSibling.textContent = "Address is required.";
//       isValid = false;
//     }

//     // Bio
//     const bio = document.getElementById("bio");
//     if (!bio.value.trim() || bio.value.trim().length < 20) {
//       bio.nextElementSibling.textContent = "Bio must be at least 20 characters.";
//       isValid = false;
//     }

//     // Current Salary
//     const currentSalary = document.getElementById("current_salary");
//     if (currentSalary.value && parseFloat(currentSalary.value) < 0) {
//       currentSalary.nextElementSibling.textContent = "Salary must be positive.";
//       isValid = false;
//     }

//     // Expected Salary
//     const expectedSalary = document.getElementById("expected_salary");
//     if (expectedSalary.value && parseFloat(expectedSalary.value) < 0) {
//       expectedSalary.nextElementSibling.textContent = "Salary must be positive.";
//       isValid = false;
//     }

//     if (!isValid) {
//       alert("Please fix the errors in the form before submitting.");
//       return;
//     }

//     // Build payload
//     const payload = {
//       seeker_name: seekerName.value.trim(),
//       phone: phone.value.trim(),
//       address: address.value.trim(),
//       bio: bio.value.trim(),
//       current_position: document.getElementById("current_position").value.trim(),
//       current_salary: currentSalary.value,
//       expected_salary: expectedSalary.value,
//       is_open_to_work: document.getElementById("is_open_to_work").checked
//     };

//     // Send to backend
//     const { ok, data } = await api.post("/jobseeker/profile", payload, token);
//     if (!ok) {
//       alert(data.message || "Failed to save profile");
//       return;
//     }

//     alert("Profile saved successfully!");
//     window.location.href = "jobseeker-profile.html"; // redirect to profile view
//   });
// });
