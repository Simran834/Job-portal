// index.js

// welcome message user ko lagi
window.addEventListener('DOMContentLoaded', function () {
  alert('Welcome to JobConnect!');
});

// // dashboard button handle garne 
const dashboardBtn = document.querySelector('.btn[href="homePage.html"]');
if (dashboardBtn) {
  dashboardBtn.addEventListener('click', function (e) {
    // yeta custom logic dine
  });
}

// post a job button handle garne code
const postJobBtn = document.querySelector('.btn[href="post-a-job.html"]');
if (postJobBtn) {
  postJobBtn.addEventListener('click', function (e) {
    // yeta custom logic hunchha
    //aajhai baki code yeta hunchha
  });
}