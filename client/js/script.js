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
    const userId = sessionStorage.getItem('user_id');
    const userType = sessionStorage.getItem('user_type');

    const response = await fetch(`http://127.0.0.1:8080/api/users/${userId}`
    );
    const userData = await response.json();
    displayUserSpecificData(userData, userType);
});

function displayUserSpecificData(userData, userType) {
    const feedbackElements = document.querySelectorAll(".feedback");
    const addSimulationElements = document.querySelectorAll(".addSimulation");
    const studentsElements = document.querySelectorAll(".Students");

    if (userType === 'Teacher') {
        feedbackElements.forEach(el => el.hidden = true);
        addSimulationElements.forEach(el => el.hidden = false);
        studentsElements.forEach(el => el.hidden = false);
    } else {
        feedbackElements.forEach(el => el.hidden = false);
        addSimulationElements.forEach(el => el.hidden = true);
        studentsElements.forEach(el => el.hidden = true);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".logoutButton").forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            sessionStorage.clear();
            window.location.href = "login.html";
        });
    });
});