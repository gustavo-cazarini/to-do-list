let taskArr = [];

const taskInp = document.getElementById("task");
const dateInp = document.getElementById("date");
const prioritySlt = document.getElementById("priority");
const addBtn = document.getElementById("add-btn");
const todayBtn = document.getElementById("today-btn");
const containerEl = document.getElementById("container");
const domTask = document.getElementsByClassName("tasker");
let checkboxes = document.querySelectorAll("input[type=checkbox]");
const getCurrentDate = new Date();
const currentDay = ("0" + getCurrentDate.getDate()).slice(-2);
const currentMonth = ("0" + (getCurrentDate.getMonth() + 1)).slice(-2);
const currentDateStr = `${getCurrentDate.getFullYear()}-${currentMonth}-${currentDay}`;

taskInp.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        event.preventDefault();
        addBtn.click();
    }
});

function verifyDate(taskDate) {
    if(currentDateStr == taskDate) {
        return true;
    }
}

const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

if(tasksFromLocalStorage) {
    taskArr = tasksFromLocalStorage;
    render(taskArr);
}

function render(tasks) {
    let listTasks = "";
    for(let i = 0; i < tasks.length; i++) {
        let date = (tasks[i].conclusionDate ? (!verifyDate(tasks[i].conclusionDate) ? tasks[i].conclusionDate : "Today") : ""),
            description = tasks[i].description,
            priority = (tasks[i].priority === "1" ? "green" : (tasks[i].priority === "2" ? "grey" : "red")),
            taskDone = (tasks[i].taskDone == true ? "checked" : "");
        date = (date != "Today" && date != "" ? formattedDate(date) : date);
        
        listTasks += `
            <div class="task-body" style="border-left-color: ${priority}">
                <input type="checkbox" class="tasker" ${taskDone} onchange="isChecked('${i}', this)">
                <span id="${i}">${description}</span>
                <button class="exclude-btn" onclick="excludeTask(${i})">
                    <svg width="16px" viewBox="0 0 16 16">
                        <use href="/icons.svg#trash"></use>
                    </svg>
                </button>
                <span class="conclusion-date" title="Conclusion date">${date}</span>
            </div>
        `;
    }
    containerEl.innerHTML = listTasks;
}

addBtn.addEventListener("click", function() {
    taskArr.push({
        description: taskInp.value,
        taskDone: false,
        conclusionDate: (dateInp.value ? dateInp.value : ""),
        priority: prioritySlt.value
    });
    taskInp.value = "";
    dateInp.value = "";
    prioritySlt.value = 2;
    taskInp.focus();
    localStorage.setItem("tasks", JSON.stringify(taskArr));
    render(taskArr);
});

function isChecked(id, checkbox) {
    if(checkbox.checked) {
        document.getElementById(id).style.textDecoration = "line-through";
        taskArr[id].taskDone = true;
    } else {
        document.getElementById(id).style.textDecoration = "none";
        taskArr[id].taskDone = false;
    }
    localStorage.setItem("tasks", JSON.stringify(taskArr));
}

function excludeTask(id) {
    taskArr.splice(id,1);
    localStorage.clear();
    localStorage.setItem("tasks", JSON.stringify(taskArr));
    render(taskArr);
}

function formattedDate(date) {
    let year = date.slice(0,4),
        month = date.slice(5,7),
        day = date.slice(8,10);

    return `${day}/${month}/${year}`;
}

todayBtn.addEventListener("click", function() {
    let localDate = new Date();
    const day = ("0" + localDate.getDate()).slice(-2);
    const month = ("0" + (localDate.getMonth() + 1)).slice(-2);
    let dateStr = `${localDate.getFullYear()}-${month}-${day}`;
    console.log(dateStr);
    document.getElementById('date').value = dateStr;
});


//--- MODAL ---//
const modal = document.getElementById("opt-modal");
const modalBtn = document.getElementById("open-modal");
const modalClose = document.getElementsByClassName("close-modal")[0];

modalBtn.addEventListener("click", function() {
    modal.style.display = "block";
});

modalClose.addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("click", function(event) {
    if(event.target == modal) {
        modal.style.display = "none";
    }
});




























/* function addToList() {
    var todo = document.getElementById('input-todo').value;
    if (todo.toString().length == 0) {
        alert("Enter a task!");
    }
    else {
        document.getElementById('list').innerHTML +=
            `
            <div class="list-item" style="text-decoration:none;" 
            onclick='let x = this;lt(x);'>
                ${todo}
                <button class="delete"><i class="fas fa-trash-alt trash-icon"></i></button>
            </div>
        `;
        var task_atual = document.querySelectorAll('.delete');
        for (var i = 0; i < task_atual.length; i++) {
            task_atual[i].onclick = function () {
                var a = this.parentNode;
                a.remove();
            }
        }
        document.getElementById('input-todo').value = "";
        document.getElementById('input-todo').focus();
    }
}

// lt = line-through
function lt(x){
    if(x.style.textDecoration=="none"){
        x.style.textDecoration="line-through";
        x.style.textDecorationColor="#008000";
        x.style.textDecorationStyle="double";
    }
    else{
        x.style.textDecoration="none";
    }
}

document.addEventListener('keydown', function(e){
    if(e.key=="Enter"){
        document.getElementById("add-button").click();
    }
}); */