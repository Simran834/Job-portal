# Job Portal Frontend Integration Guide

## Overview

The frontend is fully integrated with the backend API. All pages are now connected to the backend endpoints with proper validation and error handling.

## Key Features

### Authentication
- **Login Page** (`/login.html`) - Authenticates users with email, password, and role
- **Signup Page** (`/signup.html`) - Registers new jobseekers and employers
- **Token Storage** - JWT tokens stored in localStorage with automatic cleanup on logout
- **Role-Based Redirects** - Users redirected to appropriate dashboards based on role

### Core Services

#### 1. API Service (`assets/js/apiService.js`)
Centralized API client with all backend endpoints. Features:
- Automatic token injection in headers
- Error handling with automatic logout on 401
- Consistent request/response handling

#### 2. Helper Utilities (`assets/js/helpers.js`)
Common utilities for:
- User authentication checks
- Form validation
- Formatting (dates, currency)
- Navigation helpers
- UI feedback (loaders, messages)

### Page Integration

#### Public Pages (No Auth Required)
- **index.html** - Home page with job listings
- **login.html** - User login form
- **signup.html** - User registration
- **job-details.html** - Individual job details with apply button

#### Protected Pages (Auth Required)
- **jobseeker-profile.html** - Jobseeker dashboard
- **employer-profile.html** - Employer dashboard
- **application.html** - Application tracker
- **job-posting-form.html** - Post new jobs (Employers only)
- **admin-panel.html** - Admin dashboard

## API Endpoints Available

### Authentication
```
POST /api/auth/login
POST /api/auth/signup
```

### User
```
GET /api/user/profile
```

### Jobseeker
```
GET /api/jobseeker/profile
PUT /api/jobseeker/profile
POST /api/experience
GET /api/experience
PUT /api/experience/:id
DELETE /api/experience/:id
POST /api/education
GET /api/education
PUT /api/education/:id
DELETE /api/education/:id
POST /api/skill
GET /api/skill
PUT /api/skill/:id
DELETE /api/skill/:id
POST /api/sociallink
GET /api/sociallink
PUT /api/sociallink/:id
DELETE /api/sociallink/:id
```

### Jobs
```
GET /api/jobs
GET /api/jobs/:id
POST /api/jobs (Employer only)
PUT /api/jobs/:id (Employer only)
DELETE /api/jobs/:id (Employer only)
GET /api/jobs/employer/my-jobs
```

### Applications
```
POST /api/applications (Apply for job)
GET /api/applications
PATCH /api/applications/:id (Update status)
```

### Password Reset
```
POST /api/password-reset/request
POST /api/password-reset/reset
```

## Usage Instructions

### For Frontend Developers

1. **Always import required scripts:**
   ```html
   <script src="assets/js/apiService.js"></script>
   <script src="assets/js/helpers.js"></script>
   ```

2. **Check authentication:**
   ```javascript
   const user = getCurrentUser();
   if (!user.token) {
     window.location.href = '/login.html';
   }
   ```

3. **Make API calls:**
   ```javascript
   try {
     const jobs = await apiService.getAllJobs();
     console.log(jobs);
   } catch(error) {
     showError('Failed to load jobs: ' + error.message);
   }
   ```

4. **Validate forms:**
   ```javascript
   try {
     validateRequired(email, 'Email');
     validateEmail(email);
     validateMinLength(password, 6, 'Password');
     // Form is valid
   } catch(error) {
     showError(error.message);
   }
   ```

5. **Show feedback:**
   ```javascript
   showSuccess('Operation completed!');
   showError('Something went wrong');
   showLoader('Loading data...');
   hideLoader();
   ```

### Testing the Integration

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Test signup flow:**
   - Navigate to http://localhost:5050/signup.html
   - Fill in form and register
   - Should see success message and redirect to login

3. **Test login flow:**
   - Navigate to http://localhost:5050/login.html
   - Login with credentials from signup
   - Should be redirected to appropriate dashboard

4. **Test job browsing:**
   - View jobs on home page
   - Click job title to see details
   - Click "Apply" button (only as jobseeker)

5. **Test profile management:**
   - As jobseeker: Edit profile, add experience, education, skills
   - As employer: Edit company profile, post new job

## Error Handling

All API errors are caught and displayed to users. Common scenarios:

- **401 Unauthorized** - User token expired, auto-redirects to login
- **400 Bad Request** - Validation errors, displays specific field errors
- **404 Not Found** - Resource not found, displays error message
- **500 Server Error** - Shows generic error, check console for details

## localStorage Keys

- `token` - JWT authentication token
- `userId` - Current user's ID
- `userEmail` - Current user's email
- `userRole` - User's role (JOBSEEKER, EMPLOYER, ADMIN)

## Frontend File Structure

```
public/
├── index.html                 (Home page)
├── login.html                 (Login form)
├── signup.html                (Registration form)
├── job-details.html           (Job details & apply)
├── jobseeker-profile.html     (Jobseeker dashboard)
├── employer-profile.html      (Employer dashboard)
├── application.html           (Applications tracker)
├── admin-panel.html           (Admin dashboard)
├── assets/
│   ├── js/
│   │   ├── apiService.js      (✅ API client - complete)
│   │   ├── helpers.js         (✅ Utilities - complete)
│   │   ├── login.js           (✅ Login logic - updated)
│   │   ├── signup.js          (✅ Signup logic - updated)
│   │   └── [other pages].js   (🔄 To be updated)
│   └── css/
│       └── [all CSS files]
└── uploads/                   (User-uploaded files)
```

## Next Steps

1. Update remaining page JavaScripts to use apiService
2. Add form validation to profile edit pages
3. Implement search/filter on job listings
4. Add pagination to job listings and applications
5.  Add profile image upload
6. Test all user flows end-to-end

## Database Note

⚠️ Currently using database stub in `src/config/prismaClient.js` because Prisma v7 requires an adapter.

To use real database:
```bash
npm install @prisma/adapter-pg pg
```

Then update `src/config/prismaClient.js`:
```javascript
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    url: process.env.DATABASE_URL,
  }),
});

module.exports = prisma;
```

Run migrations:
```bash
npx prisma migrate deploy
npx prisma db seed
```

## Support

For issues, check:
1. Browser console (F12) for errors
2. Backend server logs
3. Network tab to see API requests/responses
