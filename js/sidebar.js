    // const sidebar = document.querySelector(".side-bar");
    // const sidebarButton = document.querySelector(".side-bar-button");

    // sidebar.addEventListener("mouseover", () => {
    //     sidebar.classList.remove("invisible");
    // });
    // sidebarButton.addEventListener("mouseover", () => {
    //     sidebar.classList.remove("invisible");
    // });

    // sidebar.addEventListener("mouseout", () => {
    //     sidebar.classList.add("invisible");
    // });
    // sidebarButton.addEventListener("mouseout", () => {
    //     sidebar.classList.add("invisible");
    // });

const sidebarMenuOnclickHandler = (target) => {
    switch(target.innerHTML) {
        case "TodoList" :
            Routes.getInstance().routeState = "todolist";
            break;
        case "Calender?" :
            Routes.getInstance().routeState = "home";
            break;
    }
    Routes.getInstance().show();
}