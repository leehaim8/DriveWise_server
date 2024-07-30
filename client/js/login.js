document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("https://drivewise-server.onrender.com/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (response.ok) {
        sessionStorage.setItem('user_id', result.userId);
        sessionStorage.setItem('user_type', result.userType);
        window.location.href = 'index.html';
    } else {
        document.getElementById("error-message").textContent = result.error;
    }
});

document.getElementById("registration-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const userType = document.getElementById("user-type").value;

    const response = await fetch("https://drivewise-server.onrender.com/api/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password,
            firstName,
            lastName,
            userType,
        })
    });

    const result = await response.json();

    if (response.ok) {
        document.getElementById("registration-container").style.display = 'none';
        document.getElementById("login-container").style.display = 'block';
        document.getElementById("login-form").reset();
        document.getElementById("registration-form").reset();
        document.getElementById("error-message").textContent = "Registration successful. Please log in.";
    } else {
        document.getElementById("registration-error-message").textContent = result.error;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const registrationContainer = document.getElementById('registration-container');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    showRegisterLink.addEventListener('click', (event) => {
        event.preventDefault();
        loginContainer.style.display = 'none';
        registrationContainer.style.display = 'block';
    });

    showLoginLink.addEventListener('click', (event) => {
        event.preventDefault();
        registrationContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });
});
