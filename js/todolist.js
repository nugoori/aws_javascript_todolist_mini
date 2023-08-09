const addTodoOnKeyUpHandler = (event) => {
    const input = document.getElementsByClassName("todolist-write-input");
    if(event.keyCode === 13) {
        generateTodoObj();
        input.value = null;
    }
}

const checkedOnChangeHandler = (target) => {
    TodolistService.getInstance().setCompletStatus(target.value, target.checked);
}

const modifyTodoOnClickHandler = (target) => {
    openModal();
    console.log(target.value);
    // undefined 찍힘
    modifyModal(TodolistService.getInstance().getTodoById(target.value));
}

const generateTodoObj = () => {
    const todoContent = document.querySelector(".todolist-write-page .todolist-write-input").value;
    // console.log(todoContent); 잘 들어갔고
    const todoObj = {
        id: 0,
        todoContent: todoContent,
        createDate: DateUtills.DateToString(new Date()),
        completStatus: false
    };

    TodolistService.getInstance().addTodo(todoObj);
}

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

    constructor() {
        this.loadTodoList();
    }

    loadTodoList() {
        this.todoList = !!localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : new Array();
        this.todoIndex = !!this.todoList[this.todoList.length -1]?.id ? this.todoList[this.todoList.length -1].id + 1 : 1;
    }

    saveLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }

    getTodoById(id) {
        console.log(this.todoList.filter(todo => todo.id === parseInt(id))[0]);
        return this.todoList.filter(todo => todo.id === parseInt(id))[0];
    }

    addTodo(todoObj) {
        const todo = {
            ...todoObj,
            id: this.todoIndex
        }
        this.todoList.push(todo);

        this.saveLocalStorage();

        this.updateTodoList();

        this.todoIndex++;
    }

    // 수정할때
    setTodo(todoObj) {
        for(let i = 0; i < this.todoList.length; i++) {
            if(this.todoList[i].id === todoObj.id) {
                this.todoList[i] = todoObj
                break;
            }
        }
        this.saveLocalStorage();

        this.updateTodoList();
    }

    setCompletStatus(id, status) {
        this.todoList.forEach((todo, index) => {
            if(todo.id === parseInt(id)) {
                this.todoList[index].completStatus = status;
            }
        });
        this.saveLocalStorage();
    }

    removeTodo(id) {
        
    }

    updateTodoList() {
        const todoListWritePage = document.querySelector(".todolist-write-page-list");

        todoListWritePage.innerHTML = this.todoList.map((todo) => {
            // console.log(todo.todoContent);
            // 전부 잘 찍힘
            return `
                <li class="todolist-items">
                    <div class="todolist-left">
                        <input type="checkbox" id="complet-checkbox${todo.id}" class="complet-chkbox"
                            ${todo.completStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandler(this);">
                        <label for="complet-checkbox${todo.id}"></label>
                    </div>
                    <div class="todolist-content">
                        <pre>${todo.todoContent}</pre>
                    </div>
                    <div class="todolist-date">
                        <p>${todo.createDate}</p>
                    </div>
                    <div class="todolist-right">
                        <div class="todolist-modify-icon td-right-icon" value="${todo.id}" onclick="modifyTodoOnClickHandler(this);">
                            <i class="fa-solid fa-feather"></i> 
                        </div>
                        <div class="todolist-delete-icon td-right-icon" value="${todo.id}" onclick="">
                            <i class="fa-regular fa-trash-can"></i>
                        </div>
                    </div>
                </li>
            `;
        }).join("");
    }
}