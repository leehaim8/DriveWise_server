async function getFunc(id) {
    const userId = sessionStorage.getItem("user_id");
    const url = id
        ? `https://drivewise-server.onrender.com/api/simulations/${id}?user_id=${userId}` : `https://drivewise-server.onrender.com/api/simulations?user_id=${userId}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.json();
}

async function getFeedback(id) {
    const userId = sessionStorage.getItem("user_id");
    const url = id
        ? `https://drivewise-server.onrender.com/api/feedback/${id}?user_id=${userId}` : `https://drivewise-server.onrender.com/api/feedback?user_id=${userId}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.json();
}

async function updateFunc(id, data) {
    const response = await fetch(`https://drivewise-server.onrender.com/api/simulations/${id}?user_id=${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }
    );
    return await response.json();
}

const handleDeleteSimulation = async (simulationId) => {
    const html = document.querySelector(".render");
    html.remove();
    new_data = new_data.filter((dt) => {
        return dt.id !== simulationId;
    });
    fetch(`https://drivewise-server.onrender.com/api/simulations/${simulationid}?user_id=${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    render(new_data);
};

async function sendDataToServer(data) {
    const response = await fetch("https://drivewise-server.onrender.com/api/simulations", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
