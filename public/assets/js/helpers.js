/**
 * Frontend utility helpers
 */

// Require auth - redirect to login if not authenticated
function requireAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login.html";
    return null;
  }
  return token;
}

// Check if user is logged in
function isLoggedIn() {
  return !!localStorage.getItem("token");
}

// Get current user info
function getCurrentUser() {
  return {
    id: localStorage.getItem("userId"),
    email: localStorage.getItem("userEmail"),
    role: localStorage.getItem("userRole"),
    token: localStorage.getItem("token"),
  };
}

// Logout user
function logout() {
  localStorage.clear();
  window.location.href = "/login.html";
}

// Show error message
function showError(message, elementId = null) {
  if (elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = message;
      el.style.display = "block";
      el.style.color = "red";
    }
  } else {
    alert(message);
  }
}

// Show success message
function showSuccess(message, elementId = null) {
  if (elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = message;
      el.style.display = "block";
      el.style.color = "green";
    }
  } else {
    alert(message);
  }
}

// Format date
function formatDate(dateString) {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// Validate form fields
function validateRequired(value, fieldName) {
  if (!value || value.trim() === "") {
    throw new Error(`${fieldName} is required`);
  }
  return true;
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    throw new Error("Please enter a valid email address");
  }
  return true;
}

function validateMinLength(value, min, fieldName) {
  if (value.length < min) {
    throw new Error(`${fieldName} must be at least ${min} characters`);
  }
  return true;
}

function validatePhoneNumber(phone) {
  const regex = /^[\d\s\-\+\(\)]+$/;
  if (!regex.test(phone)) {
    throw new Error("Please enter a valid phone number");
  }
  return true;
}

// Decode JWT token
function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
}

// Check if user has role
function hasRole(role) {
  const userRole = localStorage.getItem("userRole");
  return userRole === role.toUpperCase();
}

// Build query string from object
function buildQueryString(params) {
  return Object.keys(params)
    .filter((key) => params[key] !== null && params[key] !== "")
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join("&");
}

// Parse query string to object
function parseQueryString() {
  const params = new URLSearchParams(window.location.search);
  const obj = {};
  for (const [key, value] of params) {
    obj[key] = value;
  }
  return obj;
}

// Create and show loading spinner
function showLoader(message = "Loading...") {
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.innerHTML = `
    <div style="text-align: center; padding: 2rem;">
      <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto; margin-bottom: 1rem;"></div>
      <p>${message}</p>
    </div>
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `;
  document.body.appendChild(loader);
  return loader;
}

// Remove loader
function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.remove();
}

// Setup navigation based on role
function setupNavigation() {
  const user = getCurrentUser();
  if (!user.token) return;

  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const role = user.role.toLowerCase();
  let navHTML = `
    <div style="display: flex; align-items: center; gap: 1rem;">
      <span style="color: #fff; font-size: 0.9rem;">Welcome, ${user.email}</span>
      <select id="roleNav" style="padding: 0.5rem; border-radius: 5px;">
        <option>--- Menu ---</option>
        ${role === "jobseeker" ? `
          <option value="profile">My Profile</option>
          <option value="applications">My Applications</option>
          <option value="browse">Browse Jobs</option>
        ` : ""}
        ${role === "employer" ? `
          <option value="profile">Company Profile</option>
          <option value="jobs">My Job Postings</option>
          <option value="applications">Applications</option>
          <option value="post">Post New Job</option>
        ` : ""}
        ${role === "admin" ? `
          <option value="dashboard">Dashboard</option>
          <option value="users">Manage Users</option>
          <option value="jobs">Manage Jobs</option>
        ` : ""}
        <option value="logout">Logout</option>
      </select>
    </div>
  `;

  const navContainer = navbar.querySelector(".nav-links") || navbar;
  if (navContainer) {
    const select = document.createElement("div");
    select.innerHTML = navHTML;
    navContainer.appendChild(select);

    document.getElementById("roleNav")?.addEventListener("change", (e) => {
      const value = e.target.value;
      if (value === "logout") {
        logout();
      } else if (value) {
        navigateByRole(value);
      }
    });
  }
}

function navigateByRole(page) {
  const role = localStorage.getItem("userRole").toLowerCase();
  const routes = {
    jobseeker: {
      profile: "/jobseeker-profile.html",
      applications: "/application.html",
      browse: "/index.html",
    },
    employer: {
      profile: "/employer-profile.html",
      jobs: "/job-posting-form.html",
      applications: "/employer-applications.html",
      post: "/job-posting-form.html",
    },
    admin: {
      dashboard: "/admin-panel.html",
      users: "/admin-panel.html",
      jobs: "/admin-panel.html",
    },
  };

  const url = routes[role]?.[page];
  if (url) window.location.href = url;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    requireAuth,
    isLoggedIn,
    getCurrentUser,
    logout,
    showError,
    showSuccess,
    formatDate,
    formatCurrency,
    validateRequired,
    validateEmail,
    validateMinLength,
    validatePhoneNumber,
    decodeToken,
    hasRole,
    buildQueryString,
    parseQueryString,
    showLoader,
    hideLoader,
    setupNavigation,
    navigateByRole,
  };
}
