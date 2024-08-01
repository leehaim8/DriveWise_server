const url = new URL(window.location.href);
const userId = url.searchParams.get('studentId');
let RangeList = [];

async function validateFeedback(event) {
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
        comments: form.elements["comments"].value,
        city: form.elements["city"].value
    };

    let checkbox = form.elements["checkbox-btn"];

    let errorMessage = validateDataFeedback(data, checkbox);

    if (errorMessage !== '') {
        console.log(errorMessage);
    } else {
        const weatherDescription = await getWeather(data.city);
        if (weatherDescription) {
            data.weather = weatherDescription.weather;
            data.temperature = weatherDescription.temp;
        }
        sendFeedbackToServer(data);
        form.reset();
    }
}

function validateDataFeedback(data, checkbox) {
    let errorMessage = '';

    if (!data.grade || data.grade <= 0 || data.grade > 100) {
        errorMessage += 'Grade is required and must be a number between 0 and 100.\n';
    }

    if (!data.city || data.city.trim() === '') {
        errorMessage += 'City is required.\n';
    }

    if (!data.lessonNumber || data.lessonNumber <= 0) {
        errorMessage += 'Lesson Number is required and must be greater than 0.\n';
    }

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

async function getWeather(city) {
    const apiKey = '956c7860b2a6225577cdd6fdc3bd995d';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        temp = Math.round(data.main.temp);
        weather = data.weather[0].main;
        return { temp, weather };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

async function sendFeedbackToServer(data) {
    try {
        const response = await fetch(`https://drivewise-server.onrender.com/api/feedback/${userId}`, {
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
            width: "70%",
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
