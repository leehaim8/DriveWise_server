document.getElementById("login-form").addEventListener("submit", async function(event) {
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


