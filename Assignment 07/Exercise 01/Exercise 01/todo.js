'use strict';

function addToListOnEnter(event) {
    if (event.key != "Enter")
        return;

    addToList();
    
    event.preventDefault();
}

function addToList() {
    let list = document.getElementById("todo-list");
    let text = document.getElementById("todo-input").value;
    
    if (text == "")
        return;

    list.append(
        createTodo(text, false)
    );

    saveToLocalStorage();
}

function createTodo(text, isDone) {
    let todo = document.createElement("li")

    todo.innerHTML = text;

    if (isDone)
        todo.classList.add("done");

    todo.addEventListener("click", (event) => { event.target.classList.toggle("done"); saveToLocalStorage();} );
    todo.addEventListener("dblclick", (event) => { event.target.remove(); saveToLocalStorage(); });

    return todo;
}

function loadFromLocalStorage() {
    if (localStorage.getItem("todos") === null)
        return;

    let todos = JSON.parse(localStorage.todos);
    let list = document.getElementById("todo-list");

    for (let todo of todos)
        list.append(
            createTodo(
                todo["text"],
                todo["done"]
            )
        );
}

function saveToLocalStorage() {
    let list = document.getElementById("todo-list");

    if (!list.hasChildNodes())
        return;

    let todos = list.children;
    let json = [];

    for (let todo of todos)
        json.push({
            "text": todo.textContent,
            "done": todo.classList.contains("done")
        });

    localStorage.setItem("todos", JSON.stringify(json));
}
