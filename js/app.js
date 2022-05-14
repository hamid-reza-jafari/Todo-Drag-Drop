var $ = document
$.querySelector(".default-todo").setAttribute("id", "hamiz" + Date.now()) // add id like other todo li on default li
let newTodoInput = $.querySelector("#todo_input") // input for add todo
let todosContainer = $.querySelector("#no_status") // first div (no status div) for add todo 
let addBtn = $.getElementById("add_btn") // first add btn for add modal
let closeModal = $.querySelector(".close-modal") // close (close btn on modal) for close modal
let containers = $.querySelectorAll(".status") // 4 containers

var myObj = {

}

// ad click to first btn for open modal
addBtn.addEventListener("click", () => {
    $.getElementById("overlay").style.display = "inline-block"
    $.querySelector("#todo_form").classList.add("active")
    newTodoInput.value = ""
    newTodoInput.focus()
})

// add event on close btn for close modal
closeModal.addEventListener("click", () => {
    $.getElementById("overlay").style.display = "none"
    $.querySelector("#todo_form").classList.remove("active")
})

// function for send todo
var send = () => {
    if (newTodoInput.value === '') {
        alert("فیلد را خالی رها کرده اید !")
    } else {
        $.getElementById("overlay").style.display = "none"
        $.querySelector("#todo_form").classList.remove("active")

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
// send todo by Enter
newTodoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        send()
    }
})
// send todo by add btn
let addTodoBtn = $.querySelector("#todo_submit")
addTodoBtn.addEventListener("click", send)
// btn for deleted a todo on first div (no status div)
let closeSpan = $.querySelectorAll(".close")
closeSpan.forEach(function (x) {
    x.addEventListener("click", (e) => {
        e.target.parentElement.remove()
    })
})
// all todo's 
let allTodos = $.querySelectorAll(".todo")
allTodos.forEach((x) => {
    x.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("its", e.target.id)
    })

})
// all div's (4 div for move todo)
containers.forEach(function (y) {
    y.addEventListener("drop", (e) => {
        let getItsData = e.dataTransfer.getData("its")
        let getId = $.getElementById(getItsData)
        e.target.append(getId)
    })
    y.addEventListener("dragover", (e) => {
        e.preventDefault()
    })
})
// add and create delete todo span (icon * in todo)
todosContainer.addEventListener("mousemove", function (e) {
    let closeSpan = $.querySelectorAll(".close")
    closeSpan.forEach(function (x) {
        x.addEventListener("click", (e) => {
            e.target.parentElement.remove()
        })
    })
})
// select 3 other container
let notStart = $.getElementById("not-start")
let progress = $.getElementById("in-progress")
let completed = $.getElementById("completed")
let noStatus = $.getElementById("no_status")
// function for => setObject Todo's Place + deleted span remove 
function removeCloseSpan(e) {
    e.target.querySelectorAll(".todo").forEach((x) => {
        myObj[x.getAttribute("id")] = e.target.id
        console.log(myObj);

        if (x.querySelector(".close")) {
            x.querySelector(".close").remove()
        }

    })
}
// add event drop and up function to 3 other container
noStatus.addEventListener("drop", removeCloseSpan)
notStart.addEventListener("drop", removeCloseSpan)
progress.addEventListener("drop", removeCloseSpan)
completed.addEventListener("drop",removeCloseSpan)






