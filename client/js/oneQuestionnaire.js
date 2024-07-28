const query = location.search;
const urlParams = new URLSearchParams(query);
const feedbackId = parseInt(urlParams.get("feedbackid"));

const handleGetQuestionnaire = async () => {
    const response = await getQuestionnaire();
    console.log("Questionnaire data received:", response);
    render(response);
};

window.onload = handleGetQuestionnaire;

function render(questionnaire) {
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
    submitButton.onclick = function() {
        // check the answers and do stuff...
        console.log('hey!');
        const question1Answer = +document.querySelector('input[name="question-1"]:checked').value;
        const question2Answer = +document.querySelector('input[name="question-2"]:checked').value;

        console.log(`question1Answer: ${question1Answer}`);
        console.log(`question2Answer: ${question2Answer}`);

        if (question1Answer === questionnaire[0]["correctAnswer"] && question2Answer === questionnaire[1]["correctAnswer"]) {
            console.log("WOW!");
        }
    };

    rootElement.append(submitButton);
}