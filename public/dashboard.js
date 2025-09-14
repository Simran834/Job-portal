const apiUrl = "http://localhost:5050/apii";

export default apiUrl;

//load dashboard data when page loads
window.onload = async () => {
    const token = localStorage.getItem("token");    
    if (!token) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
    }
    try {
        const response = await fetch(`${apiUrl}/dashboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log(data);
        document.getElementById("welcomeMessage").textContent = `Welcome, ${data.name}`;
        document.getElementById("jobCount").textContent = data.jobCount;
        document.getElementById("applicationCount").textContent = data.applicationCount;
        document.getElementById("messageCount").textContent = data.messageCount;
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        alert("Failed to load dashboard data. Please try again.");
    }   
};

//logout function
document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
};
//redirect to profile page
document.getElementById("profileBtn").onclick = () => {
    window.location.href = "profile.html";
};
//redirect to jobs page
document.getElementById("jobsBtn").onclick = () => {
    window.location.href = "jobs.html";
};
//redirect to applications page
document.getElementById("applicationsBtn").onclick = () => {
    window.location.href = "applications.html";
};
//redirect to messages page
document.getElementById("messagesBtn").onclick = () => {
    window.location.href = "messages.html";
};  
//redirect to settings page
document.getElementById("settingsBtn").onclick = () => {
    window.location.href = "settings.html";
};
//redirect to admin page
document.getElementById("adminBtn").onclick = () => {
    window.location.href = "admin.html";
};
//redirect to home page
document.getElementById("homeBtn").onclick = () => {
    window.location.href = "homePage.html";
}
//redirect to about us page
document.getElementById("aboutUsBtn").onclick = () => {
    window.location.href = "aboutUs.html";
}
//redirect to contact us page
document.getElementById("contactUsBtn").onclick = () => {
    window.location.href = "contactUs.html";
}
//redirect to faq page
document.getElementById("faqBtn").onclick = () => {
    window.location.href = "faq.html";
}
//redirect to terms and conditions page
document.getElementById("termsBtn").onclick = () => {
    window.location.href = "terms.html";
}
//redirect to privacy policy page
document.getElementById("privacyBtn").onclick = () => {
    window.location.href = "privacy.html";
}
//redirect to careers page
document.getElementById("jobsBtn").onclick = () => {
    window.location.href = "jobs.html";
}
//redirect to blog page
document.getElementById("blogBtn").onclick = () => {
    window.location.href = "blog.html";
}   
//redirect to resources page
// document.getElementById("resourcesBtn").onclick = () => {
//     window.location.href = "resources.html";
// }
//redirect to help page
document.getElementById("helpBtn").onclick = () => {
    window.location.href = "help.html";
}
//redirect to feedback page
document.getElementById("feedbackBtn").onclick = () => {
    window.location.href = "feedback.html";
}

//redirect to support page
document.getElementById("supportBtn").onclick = () => {
    window.location.href = "support.html";
}