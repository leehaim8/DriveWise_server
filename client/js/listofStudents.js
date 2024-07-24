const renderStudents = (data) => {
    const root = document.querySelector("#root");
    root.innerHTML = "";

    let renderElement = document.querySelector(".student-render");
    if (!renderElement) {
        renderElement = document.createElement("section");
        renderElement.classList.add("student-render");
    }

    if (data.length > 0) {
        data.forEach((student) => {
            const parentSection = document.createElement("section");
            parentSection.classList.add("simulation-item");

            const studentP = document.createElement("p");
            studentP.classList.add("student-text");
            const studentText = document.createTextNode(`${student.user_first_name} ${student.user_last_name}`);
            studentP.appendChild(studentText);
            parentSection.appendChild(studentP);

            const studentIcons = document.createElement("div");
            studentIcons.classList.add("student-icons");

            const feedbackLink = document.createElement("a");
            feedbackLink.href = `./feedbackForm.html?studentId=${student.user_id}`;
            feedbackLink.classList.add("feedback-icon");
            feedbackLink.textContent = "Feedback";
            studentIcons.appendChild(feedbackLink);

            parentSection.appendChild(studentIcons);
            renderElement.appendChild(parentSection);
        });
        root.appendChild(renderElement);
    }
};

window.onload = loadPage;
let student_data = [];

const searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("keyup", (ev) => searchStudent(ev));

async function loadPage() {
    const data = await getStudents();
    student_data = data;
    renderStudents(student_data);
}

function searchStudent(ev) {
    const searchText = ev.target.value;
    const filteredList = student_data.filter((student) => {
        return `${student.user_first_name} ${student.user_last_name}`.toLowerCase().includes(searchText.toLowerCase());
    });

    renderStudents(filteredList);
}

async function getStudents() {
    const response = await fetch(`http://127.0.0.1:8080/api/users/students`);
    if (!response.ok) {
        console.error("Failed to fetch students:", response.statusText);
        return [];
    }
    return await response.json();
}
