var $ = document
let addBtn = $.getElementById("add_btn")
addBtn.addEventListener("click", () => {
    $.getElementById("overlay").style.display = "inline-block"
    $.querySelector(".modal").classList.add("active")
})
let closeModal = $.querySelector(".close-modal")
closeModal.addEventListener("click", () => {
    $.getElementById("overlay").style.display = "none"
    $.querySelector(".modal").classList.remove("active")
})
let newTodoInput = $.querySelector("#todo_input")
let todosContainer = $.querySelector("#no_status")

addBtn.addEventListener("click", (e) => {
    newTodoInput.value = ""
    newTodoInput.focus()
})
var send = () => {
    if (newTodoInput.value === '') {
        alert("فیلد را خالی رها کرده اید !")
    } else {
        $.getElementById("overlay").style.display = "none"
        $.querySelector(".modal").classList.remove("active")

        let createNewElem = $.createElement("div")
        createNewElem.setAttribute("class", "todo");
        createNewElem.setAttribute("draggable", "true")
        createNewElem.setAttribute("id", "hamiz" + Date.now())
        createNewElem.innerHTML = newTodoInput.value + '<span class="close">&times;</span>'

        createNewElem.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("its", e.target.id)
        })

        todosContainer.append(createNewElem)
        newTodoInput.value = ""
    }
}
newTodoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        send()
    }
})
let addTodoBtn = $.querySelector("#todo_submit")
addTodoBtn.addEventListener("click", send)

$.querySelector(".default-todo").setAttribute("id", "hamiz" + Date.now())

let closeSpan = $.querySelectorAll(".close")
closeSpan.forEach(function (x) {
    x.addEventListener("click", (e) => {
        e.target.parentElement.remove()
    })
})
let allTodos = $.querySelectorAll(".todo")
allTodos.forEach((x) => {
    x.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("its", e.target.id)
    })
})
let containers = $.querySelectorAll(".status")
containers.forEach(function (y) {
    y.addEventListener("drop", (e) => {
        let getItsData = e.dataTransfer.getData("its")
        let getId = $.getElementById(getItsData)
        e.target.append(getId)
    })
    y.addEventListener("dragover", (e) => {
        e.preventDefault()
    })
    console.log(y.children)
})
let noStatus = $.getElementById("no_status")
noStatus.addEventListener("mousemove", function (e) {
    let closeSpan = $.querySelectorAll(".close")
    closeSpan.forEach(function (x) {
        x.addEventListener("click", (e) => {
            e.target.parentElement.remove()
        })
    })
})
let notStart = $.getElementById("not-start")
let progress = $.getElementById("in-progress")
let completed = $.getElementById("completed")

function removeCloseSpan(e) {
    e.target.querySelectorAll(".todo").forEach((x) => {
        x.querySelector(".close").remove()
    })
}
notStart.addEventListener("drop", removeCloseSpan)
progress.addEventListener("drop", removeCloseSpan)
completed.addEventListener("drop", removeCloseSpan)