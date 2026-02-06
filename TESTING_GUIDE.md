# Quick Testing Guide - Job Portal Application

## Prerequisites
- Backend running: `node main.js`
- Server available at: http://localhost:5050
- Modern browser (Chrome, Firefox, Edge)

---

## Test Case 1: User Registration (Signup)

**Goal:** Test the signup flow for both Jobseeker and Employer roles

### Steps:

1. **Open Signup Page**
   - Navigate to: http://localhost:5050/signup.html
   - Verify form loads with fields: Username, Email, Password, Role dropdown

2. **Register as Jobseeker**
   ```
   Username: john_seeker
   Email: john@example.com
   Password: password123
   Role: Jobseeker
   ```
   - Click "Continue"
   - ✅ Expected: Success message appears
   - ✅ Expected: Redirect to login page after 2 seconds

3. **Register as Employer**
   ```
   Username: tech_company
   Email: company@techcorp.com
   Password: company123
   Role: Employer
   ```
   - Click "Continue"
   - ✅ Expected: Success message appears
   - ✅ Expected: Redirect to login page

**Validation Errors to Test:**
- Leave username empty → "Name must be at least 2 characters"
- Enter invalid email (no @) → "Please enter a valid email"
- Password < 6 chars → "Password must be at least 6 characters"
- No role selected → "Please select a role"

---

## Test Case 2: User Login

**Goal:** Test login with different roles and verify role-based redirects

### Steps:

1. **Login as Jobseeker**
   - Navigate to: http://localhost:5050/login.html
   - Enter credentials:
     ```
     Email: john@example.com
     Password: password123
     Role: Jobseeker
     ```
   - Click "Login"
   - ✅ Expected: Redirected to `/jobseeker-profile.html`
   - ✅ Expected: Token stored in browser localStorage
   - ✅ Verify token by opening DevTools Console:
     ```javascript
     localStorage.getItem('token')
     localStorage.getItem('userEmail')
     localStorage.getItem('userRole')
     ```

2. **Logout and Login as Employer**
   - Navigate to: http://localhost:5050/login.html
   - Enter:
     ```
     Email: company@techcorp.com
     Password: company123
     Role: Employer
     ```
   - Click "Login"
   - ✅ Expected: Redirected to `/employer-profile.html`

**Validation Errors to Test:**
- Wrong password → "Invalid email or password"
- Non-existent email → "Invalid email or password"
- No email/password → Error message displayed

---

## Test Case 3: Job Browsing & Viewing Details

**Goal:** Test job discovery and detailed viewing

### Steps:

1. **View Home Page**
   - Navigate to: http://localhost:5050/index.html
   - ✅ Expected: Job listings displayed (if any jobs exist in database)

2. **View Job Details**
   - Click on any job title
   - ✅ Expected: Redirected to `/job-details.html?id=<jobID>`
   - ✅ Expected: Job title, location, type, level, deadline shown
   - ✅ Expected: Job description displayed

3. **Test Apply Button Logic**
   - As NOT logged in:
     - Click "Apply"
     - ✅ Expected: Alert "Please log in to apply for jobs"
     - ✅ Expected: Redirect to login page
   
   - As logged in Jobseeker:
     - Click "Apply"
     - ✅ Expected: Confirmation dialog appears
     - Click "OK"
     - ✅ Expected: "Applying..." text on button
     - ✅ Expected: Success message
     - ✅ Expected: Redirect to `/application.html`
   
   - As logged in Employer:
     - Click "Apply"
     - ✅ Expected: Alert "Only jobseekers can apply for jobs"

---

## Test Case 4: Form Validation

**Goal:** Test client-side validation on all forms

### Signup Form Validation

| Field | Test Value | Expected Error |
|-------|-----------|-----------------|
| Username | "" (empty) | "Name must be at least 2 characters" |
| Username | "a" | "Name must be at least 2 characters" |
| Email | "notanemail" | "Please enter a valid email" |
| Email | "" | "Email is required" |
| Password | "12345" | "Password must be at least 6 characters" |
| Password | "" | "Password is required" |
| Role | "" (not selected) | "Please select a role" |

### Login Form Validation

| Field | Test Value | Expected Error |
|-------|-----------|-----------------|
| Email | "notanemail" | "Please enter a valid email address" |
| Email | "" | "Email is required" |
| Password | "" | "Password is required" |
| Role | "" | "Please select a role" |

---

## Test Case 5: Token Management

**Goal:** Verify JWT token handling and storage

### Steps:

1. **After Successful Login:**
   - Open DevTools (F12)
   - Go to Console tab
   - Run:
     ```javascript
     console.log(localStorage.getItem('token'))
     console.log(localStorage.getItem('userId'))
     console.log(localStorage.getItem('userEmail'))
     console.log(localStorage.getItem('userRole'))
     ```
   - ✅ Expected: All values present and correct

2. **Verify Token Format:**
   - Copy the token from localStorage
   - Visit: https://jwt.io
   - Paste token in "Encoded" section
   - ✅ Expected: Payload shows `id`, `role`, `iat`, `exp`

3. **Test Token Expiry:**
   - Token expires in 5 days (for login)
   - Manually clear token to test logout:
     ```javascript
     localStorage.clear()
     ```
   - Refresh page
   - ✅ Expected: Sent back to login page

---

## Test Case 6: Protected Routes

**Goal:** Test that protected pages require authentication

### Steps:

1. **Clear All Tokens:**
   ```javascript
   localStorage.clear()
   ```

2. **Try to Access Protected Pages:**
   - Try: http://localhost:5050/jobseeker-profile.html
   - ✅ Expected: Should show error or redirect to login
   - Try: http://localhost:5050/employer-profile.html
   - ✅ Expected: Should show error or redirect to login

---

## Test Case 7: Network Inspection

**Goal:** Verify API calls are being made correctly

### Steps:

1. **Open DevTools Network Tab (F12 → Network)**

2. **Register New User:**
   - Fill signup form
   - Click "Continue"
   - Look for POST request to `localhost:5050/api/auth/signup`
   - ✅ Expected: 200 OK response
   - ✅ Expected: Response contains `token`, `user`, `message`

3. **Login:**
   - Go to login page
   - Submit credentials
   - Look for POST request to `localhost:5050/api/auth/login`
   - ✅ Expected: 200 OK response
   - ✅ Expected: Response headers include JWT token

4. **Browse Jobs:**
   - Go to home page
   - Look for GET request to `localhost:5050/api/jobs`
   - ✅ Expected: 200 OK response
   - ✅ Expected: Array of job objects in response

5. **Apply for Job:**
   - Click apply as jobseeker
   - Confirm dialog
   - Look for POST request to `localhost:5050/api/applications`
   - ✅ Expected: Request includes Authorization header with token
   - ✅ Expected: 200 OK / 201 Created response

---

## Test Case 8: Error Handling

**Goal:** Test graceful error handling

### Steps:

1. **Invalid Credentials:**
   - Login with wrong password
   - ✅ Expected: User-friendly error message (not JavaScript error)
   - ✅ Expected: Remain on login page

2. **Network Error:**
   - Disconnect internet
   - Try to login
   - ✅ Expected: Error message displayed
   - ✅ Expected: No console errors

3. **Bad Job ID:**
   - Navigate to: http://localhost:5050/job-details.html?id=99999
   - ✅ Expected: "Error loading job details" message shown
   - ✅ Expected: No console crashes

---

## Test Case 9: Complete User Journey

**Goal:** Test entire workflow from registration to job application

### Jobseeker Journey:

1. ✅ Register as Jobseeker
2. ✅ Login with credentials
3. ✅ Verify redirected to jobseeker dashboard
4. ✅ Navigate to home page
5. ✅ Browse available jobs
6. ✅ View job details
7. ✅ Apply for job
8. ✅ See success message

### Employer Journey:

1. ✅ Register as Employer
2. ✅ Login with credentials
3. ✅ Verify redirected to employer dashboard
4. ✅ (Should be able to post new job - if page supports it)
5. ✅ (Should be able to view applications - if page supports it)

---

## Test Case 10: Browser Console Check

**Goal:** Verify no JavaScript errors during normal usage

### Steps:

1. **Open Console (F12 → Console)**

2. **Perform Actions:**
   - Register
   - Login
   - View jobs
   - View job details
   - Apply for job

3. **Check Console:**
   - ✅ Expected: No red errors
   - ⚠️ Warnings OK
   - All network requests should succeed

---

## Quick Debugging Tips

### If signup doesn't work:
1. Check browser console for JavaScript errors
2. Check Network tab for POST to `/api/auth/signup`
3. Verify backend server is running
4. Check .env file has JWT_SECRET set

### If login doesn't work:
1. Verify user was created in signup
2. Check password matches exactly
3. Verify role selection
4. Check backend logs for errors

### If apply button doesn't work:
1. Verify logged in and token exists in localStorage
2. Check user role is JOBSEEKER
3. Check Network tab for POST request
4. Look for error message in response

### If redirects don't happen:
1. Check browser for multiple tab issues
2. Clear cache (Ctrl+Shift+Delete)
3. Try Incognito/Private mode
4. Check console for JavaScript errors

---

## Expected Responses

### Successful Login Response:
```json
{
  "message": "login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 12,
    "email": "john@example.com",
    "role": "JOBSEEKER"
  }
}
```

### Successful Signup Response:
```json
{
  "message": "Signup successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 15,
    "email": "john@example.com",
    "role": "JOBSEEKER"
  }
}
```

### Jobs List Response:
```json
[
  {
    "id": 1,
    "title": "Senior Developer",
    "location": "New York",
    "company": "Tech Corp",
    "job_type": "Full-time",
    "experience_level": "Senior",
    "description": "...",
    "salary_min": 100000,
    "salary_max": 150000,
    "application_deadline": "2026-03-01"
  },
  ...
]
```

---

## Test Results Template

```
Test Date: ___________
Tester: ___________
Browser: ___________

✅ / ❌ Test Case 1: User Registration
  Notes: ___________

✅ / ❌ Test Case 2: User Login
  Notes: ___________

✅ / ❌ Test Case 3: Job Browsing
  Notes: ___________

✅ / ❌ Test Case 4: Form Validation
  Notes: ___________

✅ / ❌ Test Case 5: Token Management
  Notes: ___________

✅ / ❌ Test Case 6: Protected Routes
  Notes: ___________

✅ / ❌ Test Case 7: Network Inspection
  Notes: ___________

✅ / ❌ Test Case 8: Error Handling
  Notes: ___________

✅ / ❌ Test Case 9: Complete Journey
  Notes: ___________

✅ / ❌ Test Case 10: Console Check
  Notes: ___________

Overall Status: ✅ PASSED / ❌ FAILED
Issues Found: ___________
```

---

**Ready to test! Start the server with `node main.js` and visit http://localhost:5050**
