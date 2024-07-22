const render = (data) => {
    const root = document.querySelector("#root");
    root.innerHTML = "";

    let renderElement = document.querySelector(".render");
    if (!renderElement) {
        renderElement = document.createElement("section");
        renderElement.classList.add("render");
    }

    if (data.length > 0) {
        data.forEach((simul) => {
            const parentSection = document.createElement("section");
            parentSection.classList.add("simulation-item");
            const checkDiv = document.createElement("div");
            checkDiv.classList.add("checkEl");
            parentSection.appendChild(checkDiv);
            const simulP = document.createElement("p");
            simulP.classList.add("simul-text");
            const simulText = document.createTextNode(simul.simulationName);
            simulP.appendChild(simulText);
            parentSection.appendChild(simulP);
            const simulIcons = document.createElement("div");
            simulIcons.classList.add("simul-icons");
            parentSection.appendChild(simulIcons);
            const simulVrIcon = document.createElement("div");
            simulVrIcon.classList.add("simul-one-icon");
            simulVrIcon.classList.add("vr-icon-simulation");
            simulIcons.appendChild(simulVrIcon);
            const linkToSimul = document.createElement("a");
            linkToSimul.href = `./oneSimulation.html?simulationid=${simul.id}`;
            linkToSimul.classList.add("simul-one-icon");
            linkToSimul.classList.add("eye-icon-simulation");
            simulIcons.appendChild(linkToSimul);
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("simul-one-icon");
            deleteBtn.classList.add("delete-icon-simulation");
            deleteBtn.addEventListener("click", () =>
                handleDeleteSimulation(simul.id)
            );
            simulIcons.appendChild(deleteBtn);
            renderElement.appendChild(parentSection);
        });
        root.appendChild(renderElement);
    }
};

window.onload = loadPage();
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
    const findedList = new_data.filter((dt) => {
        return dt.simulationName
            ?.toLowerCase()
            ?.includes(searchText?.toLowerCase());
    });

    render(findedList);
}
