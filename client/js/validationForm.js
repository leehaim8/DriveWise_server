function validateForm(event) {
    event.preventDefault();

    let form = document.getElementById("form-section");
    let data = {
        simulationType: form.elements["simulation-Type"].value,
        simulationName: form.elements["simulation-Name"].value,
        simulationPerform: form.elements["simulation-Perform"].value,
        simulationScore: form.elements["simulation-Score"].value,
        simulationAttempts: form.elements["simulation-Attempts"].value,
        simulationDetails: form.elements["simulation-Details"].value,
        simulationFile: form.elements["simulation-Link"].value
    };
    let checkbox = form.elements["checkbox-btn"];

    let errorMessage = validateData(data, checkbox);

    if (errorMessage !== '') {
        console.log(errorMessage);
    } else {
        if (data.simulationType === 'Basic simulation') {
            sendDataToServer(data);
        }
        form.reset();
    }
}

function validateData(data, checkbox) {
    let errorMessage = '';
    let numberPattern = /\d/;

    if (data.simulationName === '') {
        errorMessage += 'Simulation Subject is required.\n';
    } else if (numberPattern.test(data.simulationName)) {
        errorMessage += 'Simulation Subject should not contain numbers.\n';
    }

    if (data.simulationAttempts === '') {
        errorMessage += 'Simulation Attempts is required.\n';
    } else if (isNaN(data.simulationAttempts) || data.simulationAttempts <= 0 || !Number.isInteger(Number(data.simulationAttempts))) {
        errorMessage += 'Number of Attempts must be a positive and Integer number.\n';
    }

    if (data.simulationPerform === '') {
        errorMessage += 'Simulation Perform is required.\n';
    } else {
        let datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
        if (!datePattern.test(data.simulationPerform)) {
            errorMessage += 'Simulation Perform must be in the format DD-MM-YYYY.\n';
        } else {
            let dateParts = data.simulationPerform.split('-');
            data.simulationPerform = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        }
    }

    if (data.simulationScore === '') {
        errorMessage += 'Simulation score is required.\n';
    } else if (isNaN(data.simulationScore) || data.simulationScore < 0 || data.simulationScore > 100) {
        errorMessage += 'Simulation Score must be a number between 0 and 100.\n';
    }

    if (data.simulationDetails === '') {
        errorMessage += 'Simulation Details is required.\n';
    }

    if (data.simulationFile === '') {
        errorMessage += 'Simulation Link is required.\n';
    } else if (!data.simulationFile.includes('https://www.youtube.com/embed/')) {
        errorMessage += 'Simulation Link must be a valid link.\n';
    }

    if (!checkbox.checked) {
        errorMessage += 'You must agree with the simulation details.\n';
    }

    return errorMessage;
}

window.onload = function () {
    document.getElementById("form-section").addEventListener("submit", function (event) {
        validateForm(event);
    });
}