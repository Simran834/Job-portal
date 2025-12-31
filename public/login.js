// login.js

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  // Example user data (replace with backend validation)
  const users = [
    { username: 'jobseeker1', password: 'pass123', role: 'jobseeker' },
    { username: 'employer1', password: 'pass456', role: 'employer' }
  ];

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();
    const role = loginForm.role.value;

    if (!username || !password || !role) {
      alert('Please fill in all fields and select a role.');
      return;
    }

    // Simulate user validation
    const user = users.find(
      u => u.username === username && u.password === password && u.role === role
    );

    if (user) {
      alert('Login successful!');
      // Redirect based on role
      if (role === 'jobseeker') {
        window.location.href = 'jobseeker.html';
      } else if (role === 'employer') {
        window.location.href = 'employersprofile.html';
      }
    } else {
      alert('Invalid credentials or role. Please try again.');
    }
  });
});