const query = location.search;
const urlParams = new URLSearchParams(query);
const feedbackId = parseInt(urlParams.get("feedbackid"));

const handleGetFeedback = async () => {
    const response = await getFeedback(feedbackId);
    render(response);
};

window.onload = handleGetFeedback;

function render(data) {
    const details = [{ 
        parking: [
            { span: "Parking:", p: "" },
            { span: "Parallel parking: ", p: data.parallelParking + "%" },
            { span: "Reverse parking: ", p: data.reverseParking + "%" },
            { span: "Diagonal parking: ", p: data.diagonalParking + "%" },
        ],
        integration: [
            { span: "Integration:", p: "" },
            { span: "Integration into the movement:", p: data.mergingInTraffic + "%" },
        ],
        roads: [  
            { span: "Roads:", p: "" },      
            { span: "One way road:", p: data.oneWayStreet + "%" },
            { span: "Two way road:", p: data.towWayStreet + "%" },
        ],
        correctDriving: [
            { span: "Correct driving:", p: "" },
            { span: "Proper turning:", p: data.properTurning + "%" },
        ],
        overTraking: [
            { span: "Over traking:", p: "" },
            { span: "Over traking:", p: data.overtraking + "%" },
        ],
        Weather: [
            { span: "Weather at the time of the lesson:", p: "" },
            { span: "Weather:", p: data.weather},
        ],
        Temperature: [
            { span: "Temperature at the time of the lesson:", p: "" },
            { span: "Temperature:", p: data.temperature},
        ],
        teacherRemarks: [
            { span: "Teacher details:", p: "" },
            { span: "", p: data.comments},
        ],
        }
    ];

    details.forEach(detail => {
        const detailsElement = document.createElement("div");
        detailsElement.classList.add("feedback-details");
        
        const parkingItems = document.createElement("div");
        parkingItems.classList.add("feedback-details-item");
        detail.parking.forEach(item => {
            const row = generateDetailItem(item);
            parkingItems.appendChild(row);
        });

        const integrationItems = document.createElement("div");
        integrationItems.classList.add("feedback-details-item");
        detail.integration.forEach(item => {
            const row = generateDetailItem(item);
            integrationItems.appendChild(row);
        });

        const roadsItems = document.createElement("div");
        roadsItems.classList.add("feedback-details-item");
        detail.roads.forEach(item => {
            const row = generateDetailItem(item);
            roadsItems.appendChild(row);
        });

        const correctDrivingItems = document.createElement("div");
        correctDrivingItems.classList.add("feedback-details-item");
        detail.correctDriving.forEach(item => {
            const row = generateDetailItem(item);
            correctDrivingItems.appendChild(row);
        });

        const overTrakingItems = document.createElement("div");
        overTrakingItems.classList.add("feedback-details-item");
        detail.overTraking.forEach(item => {
            const row = generateDetailItem(item);
            overTrakingItems.appendChild(row);
        });

        const WeatherItems = document.createElement("div");
        WeatherItems.classList.add("feedback-details-item");
        detail.Weather.forEach(item => {
            const row = generateDetailItem(item);
            WeatherItems.appendChild(row);
        });

        const TemperatureItems = document.createElement("div");
        TemperatureItems.classList.add("feedback-details-teacher-item");
        detail.Temperature.forEach(item => {
            const row = generateDetailItem(item);
            TemperatureItems.appendChild(row);
        });

        const teacherRemarksItems = document.createElement("div");
        teacherRemarksItems.classList.add("feedback-details-teacher-item");
        detail.teacherRemarks.forEach(item => {
            const row = generateDetailItem(item);
            teacherRemarksItems.appendChild(row);
        });

        detailsElement.appendChild(parkingItems);
        detailsElement.appendChild(integrationItems);
        detailsElement.appendChild(roadsItems);
        detailsElement.appendChild(correctDrivingItems);
        detailsElement.appendChild(overTrakingItems);
        detailsElement.appendChild(WeatherItems);
        detailsElement.appendChild(TemperatureItems);
        detailsElement.appendChild(teacherRemarksItems);


        const questionnaireBtn = document.createElement('button');
        questionnaireBtn.classList.add('link-button-q');
        questionnaireBtn.onclick = navigateToQuestionnaire;
        questionnaireBtn.innerText = 'Go to Questionnaire';
        detailsElement.appendChild(questionnaireBtn);
        document.getElementById("root").appendChild(detailsElement);
    });
}

function generateDetailItem(item) {
    const span = document.createElement("span");
    const paragraph = document.createElement("p");
    span.innerText = item.span;
    paragraph.innerText = item.p;

    const row = document.createElement("div");
    row.classList.add("details-row");

    if (paragraph.innerText.trim() === "") {
        row.classList.add("empty-p");
    } else {
        row.classList.add("filled-p");
    }

    row.appendChild(span);
    row.appendChild(paragraph);
    return row;
}

function navigateToQuestionnaire() {
    const currentUrl = new URL(window.location.href);
    const queryParams = currentUrl.search;
    const newPage = 'oneQuestionnaire.html';
    const newUrl = `${currentUrl.origin}${currentUrl.pathname.replace(/[^/]*$/, newPage)}${queryParams}`;
    window.location.href = newUrl;
}