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
    // undefined 찍힘 : div에는 value가 안들어감!!
    modifyModal(TodolistService.getInstance().getTodoById(target.value));
}

const deleteTodoOnclickHandler = (target) => {
    openModal();
    deleteModal(TodolistService.getInstance().getTodoById(target.value));
    // removeTodo(TodolistService.getInstance().getTodoById(target.value));
}

const generateTodoObj = () => {
    const todoContent = document.querySelector(".todolist-write-page .todolist-write-input").value;
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
        // 위에 target.value에서 unidentified id = undefined
        return this.todoList.filter(todo => todo.id === parseInt(id))[0];
    }

    getTodoByDate(createDate) {
        const findByCreateDateTodoList = new Array();
        for(let i = 0; i < this.todoList.length; i++)  {
            findByCreateDateTodoList = todoList.filter(todo => todo.createDate === parseInt(createDate))[i];
        };
        return findByCreateDateTodoList;
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

    // removeTodo(id) {
    //     this.todoList = this.todoList.filter((todo) => {
    //         return todo.id !== parseInt(id);
    //     });

    //     this.saveLocalStorage();
    //     this.updateTodoList();
    // }

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
                        <button class="todolist-modify-button td-right-button" value="${todo.id}" onclick="modifyTodoOnClickHandler(this);">
                            <i class="fa-solid fa-feather" ></i> 
                        </button>
                        <button class="todolist-delete-icon td-right-button" value="${todo.id}" onclick="deleteTodoOnclickHandler(this);">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </li>
            `;
        }).join("");
    }
}