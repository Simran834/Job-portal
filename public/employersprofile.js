document.addEventListener('DOMContentLoaded', () => {
    // Example: Fetch employer profile data from API
    fetch('/api/employer/profile')
        .then(response => response.json())
        .then(data => {
            displayProfile(data);
        })
        .catch(error => {
            console.error('Error fetching profile:', error);
            document.getElementById('profile-container').innerText = 'Failed to load profile.';
        });

    // Function to display profile data
    function displayProfile(profile) {
        const container = document.getElementById('profile-container');
        if (!container) return;

        container.innerHTML = `
            <h2>${profile.companyName}</h2>
            <p><strong>Email:</strong> ${profile.email}</p>
            <p><strong>Contact:</strong> ${profile.contact}</p>
            <p><strong>Location:</strong> ${profile.location}</p>
            <p><strong>Description:</strong> ${profile.description}</p>
            <button id="edit-profile-btn">Edit Profile</button>
        `;

        document.getElementById('edit-profile-btn').addEventListener('click', () => {
            showEditForm(profile);
        });
    }

    // Function to show edit form
    function showEditForm(profile) {
        const container = document.getElementById('profile-container');
        container.innerHTML = `
            <h2>Edit Profile</h2>
            <form id="edit-profile-form">
                <label>Company Name: <input type="text" name="companyName" value="${profile.companyName}" required></label><br>
                <label>Email: <input type="email" name="email" value="${profile.email}" required></label><br>
                <label>Contact: <input type="text" name="contact" value="${profile.contact}" required></label><br>
                <label>Location: <input type="text" name="location" value="${profile.location}" required></label><br>
                <label>Description: <textarea name="description" required>${profile.description}</textarea></label><br>
                <button type="submit">Save</button>
                <button type="button" id="cancel-edit-btn">Cancel</button>
            </form>
        `;

        document.getElementById('cancel-edit-btn').addEventListener('click', () => {
            displayProfile(profile);
        });

        document.getElementById('edit-profile-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const updatedProfile = Object.fromEntries(formData.entries());

            fetch('/api/employer/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProfile)
            })
                .then(response => response.json())
                .then(data => {
                    displayProfile(data);
                })
                .catch(error => {
                    alert('Failed to update profile.');
                });
        });
    }
});