/**
 * Enhanced API Service with error handling and token management
 */

const API_BASE = "http://localhost:5050/api";

class APIService {
  constructor() {
    this.baseURL = API_BASE;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getHeaders(includeAuth = true) {
    const headers = { "Content-Type": "application/json" };
    if (includeAuth && this.getToken()) {
      headers.Authorization = `Bearer ${this.getToken()}`;
    }
    return headers;
  }

  async request(method, endpoint, data = null, includeAuth = true) {
    const options = {
      method,
      headers: this.getHeaders(includeAuth),
    };

    if (data && (method === "POST" || method === "PUT")) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, options);
      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired - clear and redirect to login
          this.logout();
          window.location.href = "/login.html";
        }
        throw new Error(result.message || `HTTP ${response.status}`);
      }

      return result;
    } catch (error) {
      console.error(`API Error [${method} ${endpoint}]:`, error);
      throw error;
    }
  }

  // Auth endpoints
  async signup(payload) {
    return this.request("POST", "/auth/signup", payload, false);
  }

  async login(email, password, role) {
    return this.request(
      "POST",
      "/auth/login",
      { email, password, role },
      false
    );
  }

  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
  }

  // User endpoints
  async getUserProfile() {
    return this.request("GET", "/user/profile");
  }

  // Job Seeker endpoints
  async getJobseekerProfile() {
    return this.request("GET", "/jobseeker/profile");
  }

  async updateJobseekerProfile(data) {
    return this.request("PUT", "/jobseeker/profile", data);
  }

  async addExperience(data) {
    return this.request("POST", "/experience", data);
  }

  async getExperience() {
    return this.request("GET", "/experience");
  }

  async updateExperience(id, data) {
    return this.request("PUT", `/experience/${id}`, data);
  }

  async deleteExperience(id) {
    return this.request("DELETE", `/experience/${id}`);
  }

  async addEducation(data) {
    return this.request("POST", "/education", data);
  }

  async getEducation() {
    return this.request("GET", "/education");
  }

  async updateEducation(id, data) {
    return this.request("PUT", `/education/${id}`, data);
  }

  async deleteEducation(id) {
    return this.request("DELETE", `/education/${id}`);
  }

  async addSkill(data) {
    return this.request("POST", "/skill", data);
  }

  async getSkills() {
    return this.request("GET", "/skill");
  }

  async updateSkill(id, data) {
    return this.request("PUT", `/skill/${id}`, data);
  }

  async deleteSkill(id) {
    return this.request("DELETE", `/skill/${id}`);
  }

  async addSocialLink(data) {
    return this.request("POST", "/sociallink", data);
  }

  async getSocialLinks() {
    return this.request("GET", "/sociallink");
  }

  async updateSocialLink(id, data) {
    return this.request("PUT", `/sociallink/${id}`, data);
  }

  async deleteSocialLink(id) {
    return this.request("DELETE", `/sociallink/${id}`);
  }

  // Employer endpoints
  async getEmployerProfile() {
    return this.request("GET", "/employer/profile");
  }

  async updateEmployerProfile(data) {
    return this.request("PUT", "/employer/profile", data);
  }

  // Job endpoints
  async getAllJobs(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    return this.request("GET", `/jobs${queryString ? "?" + queryString : ""}`);
  }

  async getJobById(id) {
    return this.request("GET", `/jobs/${id}`);
  }

  async createJob(data) {
    return this.request("POST", "/jobs", data);
  }

  async updateJob(id, data) {
    return this.request("PUT", `/jobs/${id}`, data);
  }

  async deleteJob(id) {
    return this.request("DELETE", `/jobs/${id}`);
  }

  async getEmployerJobs() {
    return this.request("GET", "/jobs/employer/my-jobs");
  }

  // Application endpoints
  async applyForJob(jobId) {
    return this.request("POST", "/applications", { job_id: jobId });
  }

  async getApplications(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    return this.request(
      "GET",
      `/applications${queryString ? "?" + queryString : ""}`
    );
  }

  async updateApplicationStatus(id, status) {
    return this.request("PATCH", `/applications/${id}`, { status });
  }

  // Password reset endpoints
  async requestPasswordReset(email) {
    return this.request(
      "POST",
      "/password-reset/request",
      { email },
      false
    );
  }

  async resetPassword(token, newPassword) {
    return this.request(
      "POST",
      "/password-reset/reset",
      { token, newPassword },
      false
    );
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getUserRole() {
    return localStorage.getItem("userRole");
  }

  getUserId() {
    return localStorage.getItem("userId");
  }

  getUserEmail() {
    return localStorage.getItem("userEmail");
  }
}

// Export as singleton
const apiService = new APIService();
if (typeof module !== "undefined" && module.exports) {
  module.exports = apiService;
}
