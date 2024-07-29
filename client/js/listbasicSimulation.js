const render = (data) => {
    const root = document.querySelector("#root");
    root.innerHTML = "";

    let renderElement = document.querySelector(".render");
    if (!renderElement) {
        renderElement = document.createElement("section");
        renderElement.classList.add("render");
    }

    const userType = sessionStorage.getItem("user_type");

    if (data.length > 0) {
        data.forEach((simulation) => {
            const parentSection = document.createElement("section");
            parentSection.classList.add("simulation-item");
            const checkDiv = document.createElement("div");
            checkDiv.classList.add("checkEl");
            parentSection.appendChild(checkDiv);
            const simulationP = document.createElement("p");
            simulationP.classList.add("simulation-text");
            const simulationText = document.createTextNode(simulation.simulationName);
            simulationP.appendChild(simulationText);
            parentSection.appendChild(simulationP);
            const simulationIcons = document.createElement("div");
            simulationIcons.classList.add("simulation-icons");
            parentSection.appendChild(simulationIcons);

            if (userType === "Teacher") {
                const deleteBtn = document.createElement("button");
                deleteBtn.classList.add("simulation-one-icon");
                deleteBtn.classList.add("delete-icon-simulation");
                deleteBtn.addEventListener("click", () =>
                    handleDeleteSimulation(simulation.id)
                );
                simulationIcons.appendChild(deleteBtn);
            }

            const simulationVrIcon = document.createElement("div");
            simulationVrIcon.classList.add("simulation-one-icon");
            simulationVrIcon.classList.add("vr-icon-simulation");
            simulationIcons.appendChild(simulationVrIcon);
            const linkToSimulation = document.createElement("a");
            linkToSimulation.href = `./oneSimulation.html?simulationid=${simulation.id}`;
            linkToSimulation.classList.add("simulation-one-icon");
            linkToSimulation.classList.add("eye-icon-simulation");
            simulationIcons.appendChild(linkToSimulation);
            renderElement.appendChild(parentSection);
        });
        root.appendChild(renderElement);

    }
};

window.onload = loadPage;
let new_data = [];

const searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("keyup", (ev) => searchSimulation(ev));

async function loadPage() {
    const data = await getFunc();
    new_data = data;
    render(new_data);
}

function searchSimulation(ev) {
    const searchText = ev.target.value;
    const findList = new_data.filter((dt) => {
        return dt.simulationName
            ?.toLowerCase()
            ?.includes(searchText?.toLowerCase());
    });

    render(findList);
}
