document.addEventListener('DOMContentLoaded', () => {
    // joobseeker profile ko form elements
    const profileForm = document.getElementById('profileForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const skillsInput = document.getElementById('skills');
    const experienceInput = document.getElementById('experience');
    const messageDiv = document.getElementById('message');

    // localstorage bata profile load garne function
    function loadProfile() {
        const profile = JSON.parse(localStorage.getItem('jobseekerProfile'));
        if (profile) {
            nameInput.value = profile.name || '';
            emailInput.value = profile.email || '';
            skillsInput.value = profile.skills || '';
            experienceInput.value = profile.experience || '';
        }
    }

    // localstorage ma profile save garne function
    function saveProfile(e) {
        e.preventDefault();
        const profile = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            skills: skillsInput.value.trim(),
            experience: experienceInput.value.trim()
        };
        localStorage.setItem('jobseekerProfile', JSON.stringify(profile));
        messageDiv.textContent = 'Profile saved successfully!';
        setTimeout(() => { messageDiv.textContent = ''; }, 2000);
    }

    if (profileForm) {
        profileForm.addEventListener('submit', saveProfile);
        loadProfile();
    }
});