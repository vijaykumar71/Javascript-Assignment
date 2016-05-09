var taskContainer = document.getElementById('item');
var staticFormDiv = document.createElement('div');
var divItem = document.getElementById('task');
var removalChiled = document.getElementById('suggestion-text');
var taskList = [];
var trashTasks = [];
var count = 1;
function getTasks() {
    var tasks = new Array;
    var tasksStr = localStorage.getItem('tasks');
    if (tasksStr != null) {
        tasks = JSON.parse(tasksStr);
    }
    return tasks;
}
function taskData(taskId, taskTitle, taskContent, taskDateTime) {
    this.taskId = taskId;
    this.taskTitle = taskTitle;
    this.taskContent = taskContent;
    this.dateTime = taskDateTime;

}
function displayForm() {
    var formHtml = '<input type="text" id="title" class="task-title" placeholder="Title" />' +
    '<textarea class="task-content" id="content" rows="6" placeholder="content" ></textarea>' +
    '<input type="button"  value="Add Task" class="add-button btn btn-primary" id="add" onClick="addTask();" />';
    staticFormDiv.innerHTML = formHtml;
    divItem.appendChild(staticFormDiv);
}
function showTasks(taskTile, taskContent, taskDate, taskId) {

    dynamicTaskDiv = document.createElement('div');
    dynamicTaskDiv.className = 'col-xs-offset-1 col-xs-3  task-container';
    dynamicTaskDiv.id = taskId;
    
    var taskHtml = '<div ><div> <p id="'+taskId+"title"+'" contenteditable="false" class="title-text" >' + taskTile + '</p></div>' +
       '<div > <p id="'+taskId+"content"+'" contenteditable="false" class="content-text" >' + taskContent + '</p></div>' +
       '<div > <input type="button" value="Save" class="btn btn-primary" id="' + taskId + '"  onclick="saveEditedContent(this.id);" /></div>' +
       '<div  ><div class="dropdown" >  <a href="#" data-toggle="dropdown" class="dropdown-toggle">More </a>' +
        '<ul  class="dropdown-menu">' +
          ' <li><a href="#" id="' + taskId + '" onclick= " deleteTask(this.id); ">Delete</a></li>' +
          ' <li><a href="#" id="' + taskId + '" onclick="editTask(this.id)"  >Edit</a></li>' +
      ' </ul></div> </div></div>';
    dynamicTaskDiv.innerHTML = taskHtml;
    taskContainer.appendChild(dynamicTaskDiv);
}
function showAllTasks() {
    var savedTask = localStorage.getItem("tasks");
    alert(savedTask[0].taskData.taskTitle);
    //for (var k = 0; k < savedTask.length;k++)
    //{
    //dynamicTaskDiv = document.createElement('div');
    //dynamicTaskDiv.className = 'col-xs-offset-1 col-xs-3  task-container';
    //dynamicTaskDiv.id = savedTask[k].taskId;
    //var taskHtml = "";
    
    //taskHtml += '<div><div> <p id="' + savedTask[k].taskId + "title" + '" contenteditable="false" class="title-text" >' +savedTask[k].taskTitle + '</p></div>' +
    //   '<div > <p id="' + savedTask[k].taskId + "content" + '" contenteditable="false" class="content-text" >' + savedTask[k].taskContent + '</p></div>' +
    //   '<div > <input type="button" value="Save" class="btn btn-primary" id="' + savedTask[k].taskId + '"  onclick="saveEditedContent(this.id);" /></div>' +
    //   '<div  ><div class="dropdown" >  <a href="#" data-toggle="dropdown" class="dropdown-toggle">More </a>' +
    //    '<ul  class="dropdown-menu">' +
    //      ' <li><a href="#" id="' + savedTask[k].taskId + '" onclick= " deleteTask(this.id); ">Delete</a></li>' +
    //      ' <li><a href="#" id="' + savedTask[k].taskId + '" onclick="editTask(this.id)"  >Edit</a></li>' +
    //  ' </ul></div> </div></div>';
    //dynamicTaskDiv.innerHTML = taskHtml;
    //taskContainer.appendChild(dynamicTaskDiv);

    //}
}
function saveTask(tasksArray) {
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}
function addTask() {
    this.taskTitle = document.getElementById('title').value;
    this.taskContent = document.getElementById('content').value;
    this.taskId = Math.floor(Math.random() * 100000);
    this.taskDateTime = new Date();
    showTasks(this.taskTitle, this.taskContent, this.taskDateTime, this.taskId);
    divItem.removeChild(staticFormDiv);
    taskList.push(new taskData(this.taskId, this.taskTitle, this.taskContent, this.taskDateTime), getTasks());
    saveTask(taskList);
}
function getTrashTasks() {
    var trashTasks = new Array;
    var trashTasksStr = localStorage.getItem('trash');
    if (trashTasksStr !== null) {
        trashTasks = JSON.parse(trashTasksStr);
    }
    return trashTasks;
}
function deleteTask(id) {
    var tasks = getTasks();
    taskContainer.removeChild(document.getElementById(id));
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].taskId == id) {
            var trashTaskObject = new taskData(tasks[i].taskId, tasks[i].taskTitle, tasks[i].taskContent, tasks[i].taskDateTime, getTrashTasks());
            trashTasks.push(trashTaskObject);
            localStorage.setItem('trash', JSON.stringify(trashTasks));
            tasks.splice(i, 1);
            break;
        }
    }

}
function editTask(id)
{
    document.getElementById(id + "title").setAttribute("contenteditable", "true");
    document.getElementById(id + "content").setAttribute("contenteditable", "true");
}
function saveEditedContent(id) {
    alert(id);
    var tasks = getTasks();
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].taskId == id) {
            tasks[i].taskTitle = document.getElementById(id + "title").value;
            tasks[i].taskContent = document.getElementById(id + "content").value;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            document.getElementById(id + "title").setAttribute("contenteditable", "false");
            document.getElementById(id + "content").setAttribute("contenteditable", "false");
            break;
        }
    }
}