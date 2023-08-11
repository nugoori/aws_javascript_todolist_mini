const openModal = () => {
    const modal = document.querySelector(".modal");
    modal.classList.remove("invisible");
}

const closeModal = () => {
    const modal = document.querySelector(".modal");
    modal.classList.add("invisible");
    modal.innerHTML = "";
}

const modifySubmitButtonOnClickHandler = (id) => {
    modifySubmitButton(id);
    closeModal();
}

const modifySubmitButtonOnKeyUpHandler = (event, id) => {
    if(event.keyCode === 13) {
        modifySubmitButton(id);
        closeModal();
    }
}

const deleteButtonOnClickHandler = (id) => {
    deleteButton(id);
    closeModal();
}

const modifySubmitButton = (id) => {
    const modiFiedTodoContent = document.querySelector(".modal-main .text-input").value;
    const todo = TodolistService.getInstance().getTodoById(id);

    if(todo.todoContent === modiFiedTodoContent || !modiFiedTodoContent) {
        return;
    }
    const todoObj = {
        ...todo,
        todoContent: modiFiedTodoContent
    }
    TodolistService.getInstance().setTodo(todoObj);
}

const deleteButton = (id) => {
    TodolistService.getInstance().todoList = TodolistService.getInstance().todoList.filter((todo) => {
        return todo.id !== parseInt(id);
    });

    TodolistService.getInstance().saveLocalStorage();
    TodolistService.getInstance().updateTodoList();
}

const modifyModal = (todo) => {
    const modal = document.querySelector(".modal");
    console.log(todo.createDate);
    modal.innerHTML = `
            <div class="modal-container">
                <header class="modal-header">
                    <h1 class="modal-title">
                        수정 할 To do
                    </h1>
                </header>
                <main class="modal-main">
                    <p class="modal-message">
                        수정할 내용을 입력하세요.
                    </p>
                    <input type="text" class="text-input" value="${todo.todoContent}"
                        onkeyup="modifySubmitButtonOnkeyUpHandler(event, ${todo.id});">
                </main>
                <footer class="modal-footer">
                    <button class="modal-btn" onclick="modifySubmitButtonOnClickHandler(${todo.id});">ok</button>
                    <button class="modal-btn" onclick="closeModal();">cancel</button>
                </footer>
            </div>
    `;
}

const deleteModal = (todo) => {
    const modal = document.querySelector(".modal");
    console.log(todo)
    console.log(todo.id)
    // undefined
    modal.innerHTML = `
            <div class="delete-modal-container">
                <main class="delete-modal-main">
                    <p class="delete-modal-message">
                        삭제 하시겠습니까?.
                    </p>
                </main>
                <footer class="modal-footer">
                    <button class="modal-btn" onclick="deleteButtonOnClickHandler(${todo.id});">ok</button>
                    <button class="modal-btn" onclick="closeModal();">cancel</button>
                </footer>
            </div>
    `
}