const query = location.search;
const urlParams = new URLSearchParams(query);
const simulationId = parseInt(urlParams.get("simulationid"));

const handleGetSimulation = async () => {
    const response = await getFunc(simulationId);
    render(response);
};

window.onload = handleGetSimulation;

function render(data) {
    const details = [
        { span: "The subject of simulation: ", p: data.simulationName },
        { span: "Number of attempts: ", p: data.attempts },
        { span: "Performed on: ", p: data.perform },
        { span: "Simulation score: ", p: data.score },
    ];

    const detailsSection = document.getElementById("details");
    details.forEach(detail => {
        const paragraph = document.createElement("p");
        const span = document.createElement("span");
        span.textContent = detail.span;
        paragraph.appendChild(span);
        paragraph.appendChild(document.createTextNode(detail.p));
        detailsSection.appendChild(paragraph);
    });

    const iframe = document.getElementById("video");
    iframe.src = data.video;

    const notesText = document.querySelector(".notes-text");
    const remarksText = document.querySelector(".remarks-text");
    notesText.addEventListener("click", () => {
        remarksText.classList.toggle("open");
        document.querySelector(".arrow").classList.toggle("rotateArrow");
    });
    remarksText.textContent = data.notes;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("edit-btn").addEventListener("click", function () {
        window.location.href = `./editSimulation.html?simulationid=${simulationId}`;
    });
});
