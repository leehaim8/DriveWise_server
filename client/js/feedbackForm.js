const url = new URL(window.location.href);
const userId = url.searchParams.get('studentId');
let RangeList = [];
function validateFeedback(event) {
    event.preventDefault();

    let form = document.getElementById("feedback-form");
    if (!form) {
        console.error("Form with id 'feedback-form' not found.");
        return;
    }

    let data = {
        lessonNumber: form.elements["lessonNumber"].value,
        lessonTopic: form.elements["lessonTopic"].value,
        grade: form.elements["lessonGrade"].value,
        reverseParking: form.elements["reverseParking"].value,
        parallelParking: form.elements["parallelParking"].value,
        diagonalParking: form.elements["diagonalParking"].value,
        mergingTraffic: form.elements["mergingTraffic"].value,
        overtaking: form.elements["overtaking"].value,
        oneWayStreet: form.elements["oneWayStreet"].value,
        twoWayStreet: form.elements["twoWayStreet"].value,
        properTurning: form.elements["properTurning"].value,
        comments: form.elements["comments"].value
    };

    let checkbox = form.elements["checkbox-btn"];

    let errorMessage = validateDataFeedback(data, checkbox);

    if (errorMessage !== '') {
        alert(errorMessage);
    } else {
        sendFeedbackToServer(data);
        form.reset();
    }
}

function validateDataFeedback(data, checkbox) {
    let errorMessage = '';

    if (!data.lessonNumber || data.lessonNumber <= 0) {
        errorMessage += 'Lesson Number is required and must be greater than 0.\n';
    }

    if (!data.lessonTopic.trim()) {
        errorMessage += 'Lesson Topic is required.\n';
    }

    if (data.comments.length > 500) {
        errorMessage += 'Comments should not exceed 500 characters.\n';
    }

    if (!checkbox.checked) {
        errorMessage += 'You must confirm the details of the simulation.\n';
    }

    return errorMessage;
}

async function sendFeedbackToServer(data) {
    try {
        const response = await fetch(`http://127.0.0.1:8080/api/feedback/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

function setupRangeInput() {
    const rangeInputs = document.querySelectorAll("input[type='hidden']");
    rangeInputs.forEach((rangeInput) => {
        const rangeDiv = document.getElementById(`${rangeInput.id}-slider`);
        const rangeObject = new RangeSlider(rangeDiv, {
            step: 1,
            min: 0,
            max: 100,
            value: 50,
            unit: "",
            width: "75%",
            design: "2d",
            showMinMaxLabels: true,
            showCurrentValueLabel: true,
            labelsPosition: "bottom",
            popup: "bottom",
            theme: "attention",
            handle: "round",
            size: "large",
            theme: "custom",
            onmove: function (value) {
                rangeInput.value = value;
            }
        });

        RangeList.push(rangeObject);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("feedback-form");

    if (form) {
        form.addEventListener("submit", validateFeedback);
    } else {
        console.error("Form with id 'feedback-form' not found.");
    }

    setupRangeInput();
});
