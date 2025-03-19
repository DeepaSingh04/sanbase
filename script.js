document.addEventListener("DOMContentLoaded", function () {
    const formPreview = document.getElementById("form-preview");
    const saveButton = document.getElementById("save-btn");
    const addButtons = document.querySelectorAll(".add-element");

    let formElements = [];

    addButtons.forEach(button => {
        button.addEventListener("click", function () {
            const type = this.getAttribute("data-type");
            addElement(type);
        });
    });

    function addElement(type) {
        const id = Date.now().toString();
        let element;

        if (type === "input") {
            element = { id, type, label: "Sample Label", placeholder: "Sample placeholder" };
        } else if (type === "select") {
            element = { id, type, label: "Select", options: ["Option 1", "Option 2", "Option 3"] };
        } else if (type === "textarea") {
            element = { id, type, label: "Text area", placeholder: "Enter text here" };
        } else if (type === "checkbox") {
            element = { id, type, label: "Sample Checkbox" };
        }

        formElements.push(element);
        renderForm();
    }

    function renderForm() {
        formPreview.innerHTML = "";
        formElements.forEach(el => {
            const div = document.createElement("div");
            div.classList.add("element");

            let field;
            if (el.type === "input") {
                field = `<input type="text" placeholder="${el.placeholder}" class="input-field">`;
            } else if (el.type === "select") {
                field = `<select class="styled-select">${el.options.map(option => `<option>${option}</option>`).join('')}</select>`;
            } else if (el.type === "textarea") {
                field = `<textarea placeholder="${el.placeholder}" class="textarea-field"></textarea>`;
            } else if (el.type === "checkbox") {
                field = `<input type="checkbox">`;
            }

            div.innerHTML = `<label>${el.label}</label> ${field} 
            <button class="remove-btn" data-id="${el.id}" aria-label="Delete">&#128465;</button>`;
            formPreview.appendChild(div);
        });

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                formElements = formElements.filter(el => el.id !== this.getAttribute("data-id"));
                renderForm();
            });
        });
    }

    saveButton.addEventListener("click", () => console.log(JSON.stringify(formElements, null, 2)));
});
