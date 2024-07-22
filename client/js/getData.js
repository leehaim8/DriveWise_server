async function getFunc(id) {
    const response = await fetch(id ? `http://127.0.0.1:8080/api/simulations/${id}` : `http://127.0.0.1:8080/api/simulations`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            access_token: sessionStorage.getItem("access_token"),
        }),
    }
    );

    return await response.json();
}

async function updateFunc(id, data) {
    const response = await fetch(`http://127.0.0.1:8080/api/simulations/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }
    );
    console.log(id);
    console.log(data);
    return await response.json();
}

const handleDeleteSimulation = async (simulationid) => {
    const html = document.querySelector(".render");
    html.remove();
    new_data = new_data.filter((dt) => {
        return dt.id !== simulationid;
    });
    fetch(`http://127.0.0.1:8080/api/simulations/${simulationid}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    render(new_data);
};

async function sendDataToServer(data) {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/simulations", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        console.log('Simulation submitted successfully');
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}