// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementsByClassName("myBtn")[0];

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

let cancel = document.getElementsByClassName("btn-cancel")[0];


// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
    titleInput.focus()
}


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    clearForm()
    modal.style.display = "none";
}

cancel.onclick = function (e) {
    e.preventDefault()
    clearForm()
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


let form = document.getElementById("task-form")

let titleInput = document.getElementById("title")

let dueDate = document.getElementById("due-date")

let submitted = document.getElementById("submitted-date")

let description = document.getElementById("description")

let msg = document.getElementById("msg")

let tasks = document.getElementById("tasks")

let Complete = document.getElementById("completed")

let Pending = document.getElementById("pending")

let All = document.querySelector(".active")

let Error = document.getElementById("error")

let ChangeMode = document.querySelector(".mode")

let newData;




let today = new Date(),
    day = today.getDate(),
    month = today.getMonth() + 1, //January is 0
    year = today.getFullYear();
if (day < 10) {
    day = '0' + day
}
if (month < 10) {
    month = '0' + month
}
today = year + '-' + month + '-' + day;

console.log(today)
document.getElementById("due-date").setAttribute("min", today);
document.getElementById("due-date").setAttribute("value", today);



//On submit
form.addEventListener('submit', function (e) {
    e.preventDefault();
    formValidation();
})


//Title validation
let formValidation = () => {
    if (titleInput.value === "") {
        msg.innerHTML = `<i class="fa fa-warning"></i> Task title cannot be empty`
    } else {
        msg.innerText = ""
        dataInput()
        clearForm()
        modal.style.display = "none";
    }
}

const idGenerator = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) // generating a 4-digit password
};


//Data collections
let data = []

let dataInput = () => {
    data.push({
        id: idGenerator(),
        title: titleInput.value,
        date: dueDate.value,
        description: description.value,
        completionStatus: false,
        Status: "Pending"
    })

    localStorage.setItem("data", JSON.stringify(data))

    newActivity()
}

let newActivity = () => {
    data = JSON.parse(localStorage.getItem('data')) || [];

    newData = data.map((item) => {
        let difference = new Date() - new Date(item.date);
        let days = Math.floor(difference / (1000 * 60 * 60 * 24))
        let absDays = Math.abs(days)

        return {
            ...item,
            numberOfDays: absDays
        }
    });

    Complete.onclick = e => {
        e.preventDefault();

        let completedData = newData.filter((task) => task.completionStatus === true);

        paintTodos(completedData)
    };

    Pending.onclick = e => {
        e.preventDefault();

        let pendingData = newData.filter((task) => task.completionStatus === false);
        paintTodos(pendingData)


    }

    All.onclick = e => {
        e.preventDefault();
        paintTodos(newData)
    }

    paintTodos(newData);

}

function paintTodos(todos) {
    let results = '';
    let status = false;


    if (!todos[0]) {
        results = `<div class="empty"><i class="fa fa-warning"></i> <h3>Task Empty: <i>Nothing to display</i></h3></div>`
    }
    todos.map((el, index) => {
        console.log(el.Status);

        if (el.Status === 'Complete') {
            status = true
        } else {
            status = false;
        }

        results += `
                     <div class="tasks-list" id=${el.id}>
                <div id="header">
                    <span class="task-no">${el.title}</span>
                    <span class="options">
                        <i class="fas fa-edit" onclick="editActivity(this)"></i>
                        <i class="fas fa-trash-alt" onclick="deleteTask(this)"></i>
                    </span>
                </div>
                <div class="date-status">
                <span class="due-date" >${el.date}</span>
                <span class="completionStatus">${el.Status}</span>
                ${status ? `
                    <span>By: ${el.numberOfDays > 1 ? el.numberOfDays + " days" : el.numberOfDays + " day"}</span>
                ` : ''}
                </div>
                
                <div class="checkme">
                <p>${el.description}</p>
                <input type="checkbox" ${el.completionStatus && "checked"}  onclick="CLICKED(${index})">
                </div>
                
                <div id="error"></div>
            </div>
                `;
    });
    tasks.innerHTML = results;
}

const deleteTask = (e) => {
    e.parentElement.parentElement.parentElement.remove();
    data = data.filter((task) => task.id !== e.parentElement.parentElement.parentElement.id);
    localStorage.setItem('data', JSON.stringify(data));
};

const editActivity = (e) => {
    const id = e.parentElement.parentElement.parentElement.id

    const currentActivity = data.find((data) => data.id === id);

    const {
        title,
        submitted: submittedDate,
        date,
        description: taskDescription
    } = currentActivity;

    titleInput.value = title;
    dueDate.value = date;
    description.value = taskDescription;

    modal.style.display = "block";

    deleteTask(e);
}


let clearForm = () => {
    titleInput.value = "",
        dueDate.value = "",
        description.value = ""
}

window.onload = () => {
    newActivity();
}


let Theme = document.querySelector(".fa-sun")

ChangeMode.onclick = (e) => {
    e.preventDefault();
    let element = document.body;
    element.classList.toggle("dark-mode") ? ChangeMode.innerHTML = `<i class="fa-sharp fa-solid fa-moon"></i>` : ChangeMode.innerHTML = `<i class="fa-sharp fa-solid fa-sun"></i>`;

}

function CLICKED(e) {

    newData[e].completionStatus = !newData[e].completionStatus
    let status = newData[e].completionStatus
    if (status) {
        newData[e].Status = "Complete"

    } else {
        newData[e].Status = "Pending"
    }


    localStorage.setItem("data", JSON.stringify(newData))
    paintTodos(newData)

}