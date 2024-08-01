let simulation;
const query = location.search;
const urlParams = new URLSearchParams(query);
const simulationId = parseInt(urlParams.get("simulationid"));

function render(data) {
    simulation = data;
    document.getElementById("subject").value = data.simulationName;
    document.getElementById("attempts").value = data.attempts;
    document.getElementById("perform").value = data.perform;
    document.getElementById("score").value = data.score;
}

function openPopup() {
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function addItem() {
    const itemInput = document.getElementById("itemInput").value;
    closePopup();
}

async function submitForm(event) {
    event.preventDefault();

    const subject = document.getElementById("subject").value;
    const attempts = document.getElementById("attempts").value;
    let perform = document.getElementById("perform").value;
    const dateParts = perform.split('-');
    perform = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    const score = document.getElementById("score").value;

    console.log(subject, attempts, perform, score);
    await updateFunc(simulationId, {
            "simulationName": subject,
            "simulationAttempts": attempts,
            "simulationPerform": perform,
            "simulationScore": score
    });

    window.location.href = './listBasicSimulation.html';
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("form-section").addEventListener("submit", submitForm);
});


