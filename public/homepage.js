const apiUrl = "http://localhost:5050/apii";

export default apiUrl;

//load dashboard data when page loads   
window.onload = async () => {
    const token = localStorage.getItem("token");    
    //noneed to login or beuser to view homepage

    if (token) {
        try {
            const response = await fetch(`${apiUrl}/dashboard`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
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
    }
};   
//logout function
document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
//redirect to profile page
document.getElementById("profileBtn").onclick = () => {
    window.location.href = "profile.html";
}
//redirect to jobs page
document.getElementById("jobsBtn").onclick = () => {
    window.location.href = "jobs.html";
}   
//redirect to applications page
document.getElementById("applicationsBtn").onclick = () => {
    window.location.href = "applications.html";
}   
//redirect to messages page
document.getElementById("messagesBtn").onclick = () => {
    window.location.href = "messages.html";
}
//redirect to settings page
document.getElementById("settingsBtn").onclick = () => {
    window.location.href = "settings.html";
}
// //redirect to admin page
// document.getElementById("adminBtn").onclick = () => {
//     window.location.href = "admin.html";
// }