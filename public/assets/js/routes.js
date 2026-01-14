const api = require("./api.js");

// Centralized frontend -> backend route helpers
export const routes = {
  auth: {
    signup: (payload) => api.post('/auth/signup', payload),
    login: (payload) => api.post('/auth/login', payload)
  },

  jobseeker: {
    create: (payload, token) => api.post('/jobseeker/create', payload, token),
    update: (payload, token) => api.put('/jobseeker/update', payload, token),
    save: (payload, token) => api.post('/jobseeker/save', payload, token),
    get: (token) => api.get('/jobseeker/get', token),
    delete: (token) => api.delete('/jobseeker/delete', token)
  },

  employer: {
    createProfile: (payload, token) => api.post('/employer/profile', payload, token),
    getProfile: (token) => api.get('/employer/profile', token),
    updateProfile: (payload, token) => api.put('/employer/profile', payload, token),
    deleteProfile: (token) => api.delete('/employer/profile', token)
  },

  jobs: {
    create: (payload, token) => api.post('/jobs', payload, token),
    list: () => api.get('/jobs'),
    getById: (jobId) => api.get(`/jobs/${jobId}`),
    update: (jobId, payload, token) => api.put(`/jobs/${jobId}`, payload, token),
    delete: (jobId, token) => api.delete(`/jobs/${jobId}`, token)
  },

  applications: {
    apply: (payload, token) => api.post('/applications', payload, token),
    getForJob: (jobId, token) => api.get(`/applications/${jobId}`, token),
    updateStatus: (applicationId, payload, token) => api.put(`/applications/${applicationId}`, payload, token),
    delete: (applicationId, token) => api.delete(`/applications/${applicationId}`, token)
  },

  experience: {
    create: (payload, token) => api.post('/experience', payload, token),
    list: (token) => api.get('/experience', token),
    update: (id, payload, token) => api.put(`/experience/${id}`, payload, token),
    delete: (id, token) => api.delete(`/experience/${id}`, token)
  },

  education: {
    create: (payload, token) => api.post('/education', payload, token),
    list: (token) => api.get('/education', token),
    update: (id, payload, token) => api.put(`/education/${id}`, payload, token),
    delete: (id, token) => api.delete(`/education/${id}`, token)
  },

  skill: {
    create: (payload, token) => api.post('/skill', payload, token),
    list: (token) => api.get('/skill', token),
    update: (id, payload, token) => api.put(`/skill/${id}`, payload, token),
    delete: (id, token) => api.delete(`/skill/${id}`, token)
  },

  socialLink: {
    create: (payload, token) => api.post('/sociallink', payload, token),
    list: (token) => api.get('/sociallink', token),
    update: (id, payload, token) => api.put(`/sociallink/${id}`, payload, token),
    delete: (id, token) => api.delete(`/sociallink/${id}`, token)
  },

  applicationActivity: {
    create: (payload, token) => api.post('/application-activity', payload, token),
    getForApplication: (applicationId, token) => api.get(`/application-activity/${applicationId}`, token),
    delete: (activityId, token) => api.delete(`/application-activity/${activityId}`, token)
  },

  passwordReset: {
    request: (payload) => api.post('/password-reset/request', payload),
    reset: (payload) => api.post('/password-reset/reset', payload)
  }
};
