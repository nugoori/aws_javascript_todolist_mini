
class TodolistService {

    static #instance = null;

    static getInstance() {
        if(this.#instance === null) {
            this.#instance = new TodolistService();
        }
        return this.#instance;
    }

    todoList = new Array();
    todoIndex = 1;


    updateTodoList() {

        const todoListWritePage = document.querySelector(".todolist-write-page-list");

        todoListWritePage.innerHTML = `
            <li>
                <div class="todolist-checkbox">
                    <input type="checkbox" placeholder="할 일을 작성하세요">
                </div>
                <div class="todolist-content">
                    <pre>asdfa</pre>
                    
                </div>
                <div class="todolist-right">
                    <button class="todolist-modify-button td-right-btn"></button>
                    <button class="todolist-delete-button td-right-btn"></button>
                </div>
            </li>
        `.join("");
    }
}