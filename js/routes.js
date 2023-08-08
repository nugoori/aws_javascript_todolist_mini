class Routes {

    static #instance = null;

    static getInstance() {
        if(this.#instance === null) {
            this.#instance = new Routes();
        }
        return this.#instance;
    }

    routeState = "home";

    show() {
        this.clear();

        switch(this.routeState) {
            case "home":
                const homePage = document.querySelector(".home-page-container");
                homePage.classList.remove("invisible");
                break;
            case "todolist":
                const todolistPage = document.querySelector(".todolist-page-main");
                todolistPage.classList.remove("invisible");
                break;
        }
    }

    clear() {
        const pages = document.querySelectorAll(".main-container > div");
        pages.forEach(page => {
            page.classList.add("invisible");
        });
    }



}