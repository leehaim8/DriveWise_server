const query = location.search;
const urlParams = new URLSearchParams(query);
const feedbackID = parseInt(urlParams.get("feedbackid"));

async function getQuestionnaire() {
    try {
        const response = await fetch(`https://drivewise-server.onrender.com/api/questionnaire/${feedbackID}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching questionnaire:', error);
        return [];
    }
}

async function updateFeedbackScore(feedbackID, questionTopic, score) {
    console.log('Updating feedback score:', feedbackID, questionTopic, score);
    try {
        const response = await fetch(`https://drivewise-server.onrender.com/api/feedback/${feedbackID}/${questionTopic}/score`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ score })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
    } catch (error) {
        console.error('Error updating feedback score:', error);
    }
}

const handleGetQuestionnaire = async () => {
    const response = await getQuestionnaire();
    render(response);
};

window.onload = handleGetQuestionnaire;

function render(questionnaire) {
    if (!questionnaire || questionnaire.length === 0) {
        console.log("No questionnaire data found");
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
        title.innerText = question.questionText;
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

            optionInput.addEventListener('change', async (event) => {
                const selectedAnswer = +event.target.value;
                const correctAnswer = +question.correctAnswer;
                const questionTopic = question.questionTopic;
                if (selectedAnswer === correctAnswer) {
                    await updateFeedbackScore(feedbackID, questionTopic, 100);
                }
            });

            const optionLabel = document.createElement("label");
            optionLabel.classList.add("question-item-option-label");
            optionLabel.setAttribute('for', `option-${questionIndex}-${index}`);
            optionLabel.innerText = question[`answer${index}`];

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
    submitButton.onclick = function () {
        const question1Answer = +document.querySelector('input[name="question-1"]:checked').value;
        const question2Answer = +document.querySelector('input[name="question-2"]:checked').value;
        const question3Answer = +document.querySelector('input[name="question-3"]:checked').value;

        const correctAnswers = [
            +document.querySelector('.question-item-option-hidden').value,
            +document.querySelectorAll('.question-item-option-hidden')[1].value,
            +document.querySelectorAll('.question-item-option-hidden')[2].value,
        ];

        let score = 0;
        if (question1Answer === correctAnswers[0]) score++;
        if (question2Answer === correctAnswers[1]) score++;
        if (question3Answer === correctAnswers[2]) score++;

        showModal(`Your score is: ${score} out of 3`);
    };

    rootElement.append(submitButton);
}

function showModal(message) {
    const scoreMessage = document.getElementById('scoreMessage');
    scoreMessage.innerText = message;

    const modal = new bootstrap.Modal(document.getElementById('Modal'));
    modal.show();

    const closeButton = document.querySelector('#Modal .btn-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            window.location.href = 'ViewFeedbackList.html';
        });
    }
}
