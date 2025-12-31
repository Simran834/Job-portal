// jobseeker-form.js

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('jobseekerProfileForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Basic validation  code
    if (!form.seeker_name.value.trim() || !form.phone.value.trim() || !form.address.value.trim() || !form.bio.value.trim() || !form.skills.value.trim()) {
      alert('Please fill all required fields.');
      return;
    }
    //aaru baki validation ko code yeta hunchha 
    alert('Job Seeker profile submitted successfully!');
    window.location.href = 'jobseeker.html';
  });
});
