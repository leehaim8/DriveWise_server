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
        data.forEach((feedback) => {
            const parentSection = document.createElement("section");
            parentSection.classList.add("feedback-item");
            const checkDiv = document.createElement("div");
            checkDiv.classList.add("NoteFeedback");
            parentSection.appendChild(checkDiv);
            const feedbackP = document.createElement("p");
            feedbackP.classList.add("feedback-text-title");
            const feedbackTextLess = document.createTextNode("Feedback for lesson " + feedback.lessonNumber + ": " + feedback.lessonTopic);
            feedbackP.classList.add("feedback-text");
            const feedbackTextGrade = document.createTextNode("Suggested grades: " + feedback.grade + "%");
            feedbackP.appendChild(feedbackTextLess);
            feedbackP.appendChild(document.createElement("br"));
            feedbackP.appendChild(feedbackTextGrade);
            parentSection.appendChild(feedbackP);

            const feedbackIcons = document.createElement("div");
            feedbackIcons.classList.add("feedback-icons");
            parentSection.appendChild(feedbackIcons);

            if (userType === "Teacher") {
                const deleteBtn = document.createElement("button");
                deleteBtn.classList.add("feedback-one-icon");
                deleteBtn.classList.add("delete-icon-feedback");
                deleteBtn.addEventListener("click", () =>
                    handleDeleteFeedback(feedback.feedbackID)
                );
                feedbackIcons.appendChild(deleteBtn);
            }

            const linkToFeedback = document.createElement("a");
            linkToFeedback.href = `./oneFeefback.html?feedbackid=${feedback.feedbackID}`;
            linkToFeedback.classList.add("feedback-one-icon");
            linkToFeedback.classList.add("eye-icon-feedback");
            feedbackIcons.appendChild(linkToFeedback);
            renderElement.appendChild(parentSection);
        });
        root.appendChild(renderElement);
    }
};

window.onload = loadPage;
let new_data = [];

const searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("keyup", (ev) => searchFeedback(ev));

async function loadPage() {
    const data = await getFeedback();
    new_data = data;
    render(new_data);
}

function searchFeedback(ev) {
    const searchText = ev.target.value;
    const findList = new_data.filter((dt) => {
        return dt.lessonTopic
            ?.toLowerCase()
            ?.includes(searchText?.toLowerCase());
    });

    render(findList);
}