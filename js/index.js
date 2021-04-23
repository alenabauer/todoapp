var myTasks = [];

function storeData() {
    localStorage.setItem("tasks", JSON.stringify(myTasks));   
}

var storedTasks = JSON.parse(localStorage.getItem("tasks"));

window.onload = function() {
    if (storedTasks.length == 0) {
        var li = document.createElement("li");
        li.innerHTML = "No tasks yet";
        document.getElementById("my-list").appendChild(li);
    } else {
        for (var i = 0; i < storedTasks.length; i++) {
            var li = document.createElement("li");
            var task = storedTasks[i];
            var t = document.createTextNode(task);
            li.appendChild(t);
            document.getElementById("my-list").appendChild(li);
            myTasks.push(task);
        }
        for (var i = 0; i < storedTasks.length; i++) {
            var span = closeButton();
            myTaskList[i].appendChild(span);
        }
    }
}

var myTaskList = document.getElementsByTagName("li");

// Create a "close" button
function closeButton() {
    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    span.onclick = function() {
        var div = this.parentElement;
        var deletedTask = div.textContent.slice(0, -1);
        for (var i in myTasks) {
            if (myTasks[i]==deletedTask) {
                myTasks.splice(i,1);
            }
        }
        storeData();
        div.style.display = "none";
    }
    return span;
}

// Append a "close" button to each list item
for (var i = 0; i < myTaskList.length; i++) {
    var span = closeButton();
    myTaskList[i].appendChild(span);
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var newTask = document.getElementById("new-task").value;
    var t = document.createTextNode(newTask);
    li.appendChild(t);
    if (newTask === '') {
        alert("You must write something!");
    } else if (myTaskList[0].innerHTML === "No tasks yet") {
        myTaskList[0].style.display = "none";
        document.getElementById("my-list").appendChild(li);
        myTasks.push(newTask);
        storeData();
    }
    else {
        document.getElementById("my-list").appendChild(li);
        myTasks.push(newTask);
        storeData();
    }
    document.getElementById("new-task").value = "";

    // Create a "close" button for the new task
    var span = closeButton();
    li.appendChild(span);
}

// Create a new list item when pressing Enter inside the input field

var input = document.getElementById("new-task");
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.which === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("add-new-task").click();
    }
});