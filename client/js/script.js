document.addEventListener("DOMContentLoaded", () => {
    const vrSection = document.getElementById("vr-section");
    if (vrSection) {
        vrSection.addEventListener("click", () => {
            const vrModal = new bootstrap.Modal(document.getElementById('vrModal'));
            vrModal.show();
        });
    }
});

document.addEventListener("DOMContentLoaded", async function() {
    if (sessionStorage.getItem('user_id') && sessionStorage.getItem('user_type')) {
        const userId = sessionStorage.getItem('user_id');
        const userType = sessionStorage.getItem('user_type');
        const response = await fetch(`http://127.0.0.1:8080/api/users/${userId}`);
        const userData = await response.json();
        displayUserSpecificData(userData, userType);
    }
    else {
        logout();
    }
});

function displayUserSpecificData(userData, userType) {
    const feedbackElements = document.querySelectorAll(".feedback");
    const addSimulationElements = document.querySelectorAll(".addSimulation");
    const studentsElements = document.querySelectorAll(".Students");

    const profilePicture = document.getElementById("profile-picture");

    if (userType === 'Teacher') {
        feedbackElements.forEach(el => el.hidden = true);
        addSimulationElements.forEach(el => el.hidden = false);
        studentsElements.forEach(el => el.hidden = false);
        profilePicture.src = `http://localhost:8080/public/Drivinginstructor.jpg`;
        profilePicture.alt = "Driving instructor profile picture";

    } else if (userType === 'Student') {
        feedbackElements.forEach(el => el.hidden = false);
        addSimulationElements.forEach(el => el.hidden = true);
        studentsElements.forEach(el => el.hidden = true);
        profilePicture.src = `http://localhost:8080/public/Amitpick.svg`;
        profilePicture.alt = "Driving student profile picture";

        const rectangleChangeElement = document.getElementById("rectangale-change");
        if (rectangleChangeElement) {
            rectangleChangeElement.innerText = "Feedback";
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".logoutButton").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            logout();
        });
    });
});

function logout() {
    sessionStorage.clear();
    window.location.href = "login.html";
}