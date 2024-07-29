let simulation;

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
    const perform = document.getElementById("perform").value;
    const score = document.getElementById("score").value;

    // let data = {
    //     simulationName: subject,
    //     simulationAttempts: attempts,
    //     simulationPerform: perform,
    //     simulationScore: score,
    //     simulationDetails: simulation.notes,
    //     simulationFile: simulation.video
    // };

    // let errorMessage = validateData(data);
    // if (errorMessage !== '') {
    //     console.log(errorMessage);
    //     return;
    // }

    await updateFunc(simulationId, {
            "simulationName": subject,
            "simulationAttempts": attempts,
            "simulationPerform": perform,
            "simulationScore": score,
            "simulationDetails": simulation.notes,
            "simulationFile": simulation.video
    });

    window.location.href = './listBasicSimulation.html';
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("form-section").addEventListener("submit", submitForm);
});


