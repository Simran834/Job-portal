document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("jobseeker-form");

  form.addEventListener("submit", e => {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    form.querySelectorAll(".error-message").forEach(el => el.textContent = "");

    // Full Name
    const seekerName = document.getElementById("seeker_name");
    if (!seekerName.value.trim()) {
      seekerName.nextElementSibling.textContent = "Full name is required.";
      isValid = false;
    }

    // Phone
    const phone = document.getElementById("phone");
    const phonePattern = /^\+977-9[0-9]{8}$/; // Example: +977-98xxxxxxx
    if (!phone.value.trim()) {
      phone.nextElementSibling.textContent = "Phone number is required.";
      isValid = false;
    } else if (!phonePattern.test(phone.value.trim())) {
      phone.nextElementSibling.textContent = "Enter a valid Nepali phone number (+977-98xxxxxxx).";
      isValid = false;
    }

    // Address
    const address = document.getElementById("address");
    if (!address.value.trim()) {
      address.nextElementSibling.textContent = "Address is required.";
      isValid = false;
    }

    // Bio
    const bio = document.getElementById("bio");
    if (!bio.value.trim() || bio.value.trim().length < 20) {
      bio.nextElementSibling.textContent = "Bio must be at least 20 characters.";
      isValid = false;
    }

    // Resume (optional but validate type if provided)
    const resume = document.getElementById("resume");
    if (resume.files.length > 0) {
      const allowedResume = [".pdf", ".doc", ".docx"];
      const fileName = resume.files[0].name.toLowerCase();
      if (!allowedResume.some(ext => fileName.endsWith(ext))) {
        resume.nextElementSibling.textContent = "Resume must be PDF, DOC, or DOCX.";
        isValid = false;
      }
    }

    // Profile Image (optional but validate type if provided)
    const profileImage = document.getElementById("profile_image");
    if (profileImage.files.length > 0) {
      const allowedImages = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedImages.includes(profileImage.files[0].type)) {
        profileImage.nextElementSibling.textContent = "Profile image must be JPG or PNG.";
        isValid = false;
      }
    }

    // Current Salary & Expected Salary (optional but must be positive)
    const currentSalary = document.getElementById("current_salary");
    if (currentSalary.value && parseFloat(currentSalary.value) < 0) {
      currentSalary.nextElementSibling.textContent = "Salary must be positive.";
      isValid = false;
    }

    const expectedSalary = document.getElementById("expected_salary");
    if (expectedSalary.value && parseFloat(expectedSalary.value) < 0) {
      expectedSalary.nextElementSibling.textContent = "Salary must be positive.";
      isValid = false;
    }

    // Final check
    if (!isValid) {
      alert("Please fix the errors in the form before submitting.");
      return;
    }

    // If valid → proceed (you can replace with API call)
    alert("Profile form validated successfully!");
    form.submit(); // or handle via fetch/axios
  });
});
