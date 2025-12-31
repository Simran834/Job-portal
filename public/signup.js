// signup.js

document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signupForm');

  
  let users = [
    { username: 'jobseeker1', email: 'js1@email.com', password: 'pass123', role: 'jobseeker' },
    { username: 'employer1', email: 'emp1@email.com', password: 'pass456', role: 'employer' }
  ];

  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = signupForm.username.value.trim();
    const email = signupForm.email.value.trim();
    const password = signupForm.password.value.trim();
    const role = signupForm.role.value;

    if (!username || !email || !password || !role) {
      alert('Please fill in all fields and select a role.');
      return;
    }

    // Check if user already exists
    const exists = users.some(u => u.username === username || u.email === email);
    if (exists) {
      alert('User already exists. Please login or use a different username/email.');
      return;
    }

    // Add new user
    users.push({ username, email, password, role });
    alert('Signup successful! Please complete your profile.');
    // Redirect based on role
    if (role === 'jobseeker') {
      window.location.href = 'jobseeker-form.html';
    } else if (role === 'employer') {
      window.location.href = 'employer-form.html';
    }
  });
});
