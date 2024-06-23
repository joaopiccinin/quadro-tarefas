const columns = document.querySelectorAll(".column__cards");

let draggedCard = null;

const dragStart = (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = "move";
}

const dragOver = (event) => {
    event.preventDefault();
}

const dragLeave = ({ target }) => {
    target.classList.remove("column--highlight");
}

const drop = ({ target }) => {
    if (target.classList.contains("column__cards")) {
        target.classList.remove("column--highlight");
        target.append(draggedCard);
    }
}

const dragEnter = ({ target }) => {
    if (target.classList.contains("column__cards")) {
        target.classList.add("column--highlight")
    }
}

const createElement = (elementClass, elementType) => {
    let element = document.createElement(elementType);
    element.className = elementClass;

    return element;
}

const createCard = ({ target }) => {
    if (!target.classList.contains("column__cards")) {
        return;
    }

    const divCard = createElement('div__card', 'div');

    const card = createElement('card', 'section');
    divCard.append(card);

    const divButtons = createElement('div__buttons', 'div');
    divCard.append(divButtons);

    const deleteButton = createElement('delete__button', 'button');

    const editButton = createElement('edit__button', 'button');
    deleteButton.textContent = "Deletar";

    divCard.draggable = true;
    card.contentEditable = true;

    card.addEventListener("focusout", () => {
        card.contentEditable = false;
        editButton.textContent = "Editar";
        divButtons.append(deleteButton);
        divButtons.append(editButton);

        if (!card.textContent) {
            card.remove();
            deleteButton.remove();
            editButton.remove();
        }
    })

    deleteButton.addEventListener("click", () => {
        divCard.remove();
    })

    editButton.addEventListener("click", () => {
        console.log(card);
        card.contentEditable = true;
        card.focus();
    })

    divCard.addEventListener("dragstart", dragStart);

    target.append(divCard);
    card.focus();
}

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
    column.addEventListener("dblclick", createCard);
})