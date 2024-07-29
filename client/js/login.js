document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://127.0.0.1:8080/api/users/login", {
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


