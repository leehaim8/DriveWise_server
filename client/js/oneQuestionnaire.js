let feedback;
const query = location.search;
const urlParams = new URLSearchParams(query);
const feedbackID = parseInt(urlParams.get("feedbackid"));

async function getQuestionnaire() {
    try {
        const response = await fetch(`http://127.0.0.1:8080/api/questionnaire`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching questionnaire:', error);
        return [];
    }
}

const handleGetQuestionnaire = async () => {
    feedback = await getFeedback(feedbackID);
    const response = await getQuestionnaire();
    render(response);
};

window.onload = handleGetQuestionnaire;

function render(questionnaire) {
    if (!questionnaire || questionnaire.length === 0) {
        alert("No questionnaire data found");
        return;
    }

    const questionnaireElement = document.createElement('div');
    questionnaireElement.classList.add('questionnaire-wrapper');
    let questionIndex = 0;
    questionnaire.forEach(question => {
        questionIndex++;
        const questionElement = document.createElement('div');
        questionElement.classList.add('question-item');

        const title = document.createElement('p');
        title.classList.add('question-item-title');
        title.innerText = question.label;
        questionElement.append(title);

        const options = [1, 2, 3];
        const optionsWrapper = document.createElement('div');
        optionsWrapper.classList.add('question-item-options');

        for (let index of options) {
            const optionInput = document.createElement('input');
            optionInput.classList.add("question-item-option-input");
            optionInput.type = "radio";
            optionInput.id = `option-${questionIndex}-${index}`;
            optionInput.name = `question-${questionIndex}`;
            optionInput.value = index;

            const optionLabel = document.createElement("label");
            optionLabel.classList.add("question-item-option-label");
            optionLabel.setAttribute('for', `option-${questionIndex}-${index}`);
            optionLabel.innerText = question[`option${index}`];

            optionsWrapper.append(optionInput);
            optionsWrapper.append(optionLabel);
        }

        questionElement.append(optionsWrapper);
        const hiddenAnswerInput = document.createElement('input');
        hiddenAnswerInput.classList.add("question-item-option-hidden");
        hiddenAnswerInput.type = "hidden";
        hiddenAnswerInput.value = question.correctAnswer;

        questionElement.append(hiddenAnswerInput);
        questionnaireElement.append(questionElement);
    });

    const rootElement = document.getElementById("root");
    rootElement.append(questionnaireElement);

    const submitButton = document.createElement('button');
    submitButton.classList.add("questionnaire-submit-btn");
    submitButton.setAttribute("type", "submit");
    submitButton.innerText = "Submit";
    submitButton.onclick = async function () {
        const question1Answer = +document.querySelector('input[name="question-1"]:checked').value;
        const question2Answer = +document.querySelector('input[name="question-2"]:checked').value;
        const question3Answer = +document.querySelector('input[name="question-3"]:checked').value;

        const correctAnswers = [
            +document.querySelector('.question-item-option-hidden').value,
            +document.querySelectorAll('.question-item-option-hidden')[1].value,
            +document.querySelectorAll('.question-item-option-hidden')[2].value,
        ];

        if (question1Answer === correctAnswers[0] && question2Answer === correctAnswers[1] && question3Answer === correctAnswers[2]) {
            await updateGradeTo100();
        }
        else {
            alert("One or more of your answers are incorrect, please try again later");
        }
        navigateToViewFeedbackList();
    };

    rootElement.append(submitButton);
}

async function updateGradeTo100() {
    try {
        const response = await fetch(`http://127.0.0.1:8080/api/feedback/grade/${feedbackID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...feedback, grade: 100 })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching questionnaire:', error);
        return [];
    }
}

function navigateToViewFeedbackList() {
    const currentUrl = new URL(window.location.href);
    const queryParams = currentUrl.search;
    const newPage = 'ViewFeedbackList.html';
    const newUrl = `${currentUrl.origin}${currentUrl.pathname.replace(/[^/]*$/, newPage)}${queryParams}`;
    window.location.href = newUrl;
}