import Task from "./Task.js";
import Project from "./Project.js";
import ToDoList from "./todo.js";
import Storage from "./storage.js";

window.onload=(event)=>{

    initDisplayButton();
    initAddProject();
    initAddTask();
    function initAddProject(){

        const addProjectButton=document.getElementById('add-project');
        const addProjectPopup=document.getElementById('button-add-project-popup');
        const cancelProjectPopup=document.getElementById('button-cancel-project-popup');
        addProjectButton.addEventListener('click',createProjectForm);
        addProjectPopup.addEventListener('click',addProject);
        cancelProjectPopup.addEventListener('click',closeProjectForm); 
    }

    function addProject(){
          const addProjectPopupInput = document.getElementById('input-add-project-popup');
          const projectName = addProjectPopupInput.value;
          if (projectName === '') {
            alert("Project name can't be empty");
            return;
          }
          if (Storage.getTodoList().contains(projectName)) {
            addProjectPopupInput.value = '';
            alert('Project names must be different');
            return;
          }
          Storage.addProject(new Project(projectName));
         // createProject(projectName);
          closeProjectForm();
          console.log(projectName);
    }

    function createProjectForm(){
   // clearProjectPreview();
        const addProjectPopup = document.getElementById('project-form');
      //  const addProjectButton = document.getElementById('add-project');
        // UI.closeAllPopups();
        addProjectPopup.classList.add('active');
     //   addProjectButton.classList.add('active');
        //console.log(addProjectToDropDown());
    }

    function closeProjectForm(){
        
        const addProjectPopup = document.getElementById('project-form');
        //const addProjectButton = document.getElementById('add-project');
        const addProjectPopupInput = document.getElementById('input-add-project-popup');
    
        addProjectPopup.classList.remove('active');
        //addProjectButton.classList.remove('active');
        addProjectPopupInput.value = '';
    }

    function initDisplayButton(){

        const displayButton=document.getElementById('display-button');
        displayButton.addEventListener('click',loadProject);
    }

    function displayProjects(projectName){
        const projectPreview=document.getElementById('project-preview');
        projectPreview.innerHTML+= `
       
        <button class="display-project-button">
        <div class="left-project-panel">
        <p class="project-content">${projectName}</p>
        </div>
      <div class="right-project-panel">
        <i class="fas fa-trash-alt"></i>
      </div>
      </button>
         
        `;
   initProjectButtons();
    }



    function loadProject(){
        clearProjectPreview();
        let length=Storage.getTodoList().projects.length;
      //  console.log(length);
        if (length == 0) {
            alert("Please add project.");
        }

        // let project = document.querySelector(".project-drop-down");
        // console.log(project);
        // project.innerHTML = "";
        for (let i = 0; i < length; i++) {
            const element = Storage.getTodoList().projects[i].name;
            // let option = document.createElement("option");
            // option.value = Storage.getTodoList().projects[i].name;
            // option.innerText = element;
            // project.appendChild(option);
            displayProjects(element);
        }
        }

    
        function initProjectButtons(){
                const projectButtons = document.querySelectorAll('.display-project-button');
               // console.log(projectButtons);

                projectButtons.forEach((projectButton) =>{
                  //  console.log(projectButton);
                  projectButton.addEventListener('click',handleProjectButton)}
                );
                
            }
        

            function handleProjectButton(e) {
                const projectName = this.children[0].children[0].textContent;
              //  console.log(this.children[0].children[0].textContent);
             // console.log(e);
               //  console.log(e.target.classList.contains('fa-times'))
              
               if (e.target.classList.contains('fa-trash-alt')) {
                deleteProject(projectName, this);
                  return;
                }
                //console.log(this);
                displayTask(projectName,this);
            
              
                
              }
        
    
    function deleteProject(projectName,projectButton){
        Storage.deleteProject(projectName);
        clearProjects();
        loadProject();
    }

    function clearProjects(){
        const projectsList = document.getElementById('project-preview');
        console.log(projectsList);
        projectsList.textContent = '';
       // console.log(projectsList);
    }
        
    function initAddTask(){
        const addTaskButton = document.getElementById('add-task');
        const addTaskPopupButton = document.getElementById('button-add-task-popup');
        const cancelTaskPopupButton = document.getElementById('button-cancel-task-popup');
        // const addTaskPopupInput = document.getElementById('input-add-task-popup');

        addTaskButton.addEventListener('click', createTaskForm);
        addTaskPopupButton.addEventListener('click', addTask);
        cancelTaskPopupButton.addEventListener('click', closeTaskForm);
        // addTaskPopupInput.addEventListener('keypress',UI.handleAddTaskPopupInput);
    }

    


    function addTask(){
        const projectName = document.querySelector('.project-drop-down').value;
        const addTaskPopupInput = document.getElementById('input-add-title-popup');
        const addDatePopupInput = document.getElementById('input-add-date-popup');
        const addDescPopupInput = document.getElementById('input-add-desc-popup');
        const addPriorityPopupInput = document.getElementById('input-add-priority-popup');
    // const addProjectPopupInput = document.querySelector('.project-drop-down');
    // console.log(addTaskPopupInput);
        const taskName = addTaskPopupInput.value;
        const taskDate = addDatePopupInput.value;
        const taskDesc = addDescPopupInput.value;
        const taskPriority = addPriorityPopupInput.options[addPriorityPopupInput.selectedIndex].text;

    // console.log(taskName);
         if (taskName === '') { 
      alert("Task name can't be empty");
      return;
    }
    if (Storage.getTodoList().getProject(projectName).contains(taskName)) {
      alert('Task names must be different');
      addTaskPopupInput.value = '';
      return;
    }

    Storage.addTask(projectName, new Task(taskName,taskDesc,taskDate,taskPriority));
    
    closeTaskForm();
    }
    

    function createTaskForm(){
     //   clearProjectPreview();
        if(Storage.getTodoList().projects.length===0) 
        {alert("Please add project first."); 
        return;}
        const addTaskPopup = document.getElementById('task-form');
        // UI.closeAllPopups();
        addTaskPopup.classList.add('active');
        addProjectToDropDown();
    }


    function closeTaskForm(){
    const addTaskPopup = document.getElementById('task-form');
        
        const addTitlePopupInput = document.getElementById('input-add-title-popup');
        const addDatePopupInput = document.getElementById('input-add-date-popup');
        const addDescPopupInput = document.getElementById('input-add-desc-popup');
        const addPriorityPopupInput = document.getElementById('input-add-priority-popup');
        const addProjectPopupInput = document.getElementById('input-add-project-popup');

        addTaskPopup.classList.remove('active');
        
        addTitlePopupInput.value = '';
        addDatePopupInput.value = '';
        addDescPopupInput.value = '';
        addPriorityPopupInput.value = '';
        addProjectPopupInput.value = '';

    }


   function  addProjectToDropDown(){
        let length=Storage.getTodoList().projects.length;
        console.log(length);
        if (length == 0) {
            alert("Please add project.");
        }

        let project = document.querySelector(".project-drop-down");
        console.log(project);
        project.innerHTML = "";
        for (let i = 0; i < length; i++) {
            const element = Storage.getTodoList().projects[i].name;
            let option = document.createElement("option");
            option.value = Storage.getTodoList().projects[i].name;
            option.innerText = element;
            project.appendChild(option);
        }
    }


    function displayTask(projectName,projectButton){
       
        const projectPreview = document.getElementById('project-preview');
        projectPreview.innerHTML = `
            <h1 id="project-name">${projectName}</h1>
            <div class="tasks-list" id="tasks-list"></div>`;
       //  console.log(projectName);
        const taskName=Storage.getTodoList().projects.filter((project)=>project.name===projectName);
      //  console.log(taskName[0].tasks.length);
        for(let i=0;i<taskName[0].tasks.length;i++){
         //   console.log(taskName[0].tasks[i].title);
            let name=taskName[0].tasks[i].title;
            let dueDate=taskName[0].tasks[i].dueDate;
          createTask(name,dueDate);
        }
       
    }

    function createTask(name,dueDate){
        const tasksList = document.getElementById('tasks-list');
        tasksList.innerHTML += `
          <button class="button-task" data-task-button>
            <div class="left-task-panel">
              <i class="far fa-circle"></i>
              <p class="task-content">${name}</p>
              
            <div class="right-task-panel">
              <p class="due-date" id="due-date">${dueDate}</p>
              <i class="fas fa-trash-alt"></i>
            </div>
          </button>`;
          initTaskButtons();
    }


    
        function initTaskButtons(){
                const taskButtons = document.querySelectorAll('.button-task');
            //  console.log(taskButtons);

                taskButtons.forEach((taskButton) =>{
                  //  console.log(projectButton);
                  taskButton.addEventListener('click',handleTaskButton)}
                );
                
            }
        

            function handleTaskButton(e) {
                const taskName = this.children[0].children[0].textContent;
              //  console.log(this.children[0].children[0].textContent);
             //console.log(this);
               //  console.log(e.target.classList.contains('fa-times'))
              
               if (e.target.classList.contains('fa-trash-alt')) {
                deleteTask(this);
                  return;
                }

                if (e.target.classList.contains('fa-circle')) {
                    displayTaskDetails(this.children[0].children[1].textContent);
                    return;
                  }
                //console.log(this);
               // displayTaskDetails(taskName,this);
              
              }
        
    
              function deleteTask(taskButton) {
                const projectName = document.getElementById('project-name').textContent;
                const taskName = taskButton.children[0].children[0].textContent;
                Storage.deleteTask(projectName, taskName);
            clearTasks();
            loadTasks(projectName);
          }
        
          function clearTasks() {
            const tasksList = document.getElementById('tasks-list');
            tasksList.textContent = '';
          }
        
          function loadTasks(projectName) {
            Storage.getTodoList()
              .getProject(projectName)
              .getTasks()
              .forEach((task) => 
              createTask(task.title, task.dueDate));
        
          }

        
          function  displayTaskDetails(taskName){
            const projectName = document.getElementById('project-name').textContent;
            // const taskName = taskButton.children[0].children[1].textContent;
            const tasks=Storage.getTodoList().projects.filter((project)=>project.name===projectName);
            console.log(tasks);
            let name='';
            let dueDate='';
            let desc='';
            let priority='';
            for(let i=0;i<tasks[0].tasks.length;i++){
                
                if(tasks[0].tasks[i].title===taskName){
                    name=tasks[0].tasks[i].title;
                    dueDate=tasks[0].tasks[i].dueDate;
                    desc=tasks[0].tasks[i].description;
                    priority=tasks[0].tasks[i].priority;
                }
            
            }
                
            const projectPreview=document.getElementById("project-preview");
            projectPreview.innerHTML=`
            <h1 id="project-name">${projectName}</h1>
            <div class="tasks-list task-display" id="tasks-list">
            <p>Task Name : ${name}</p>
            <p>Description : ${desc}</p>
            <p>Due Date : ${dueDate}</p>
            <p>Priority : ${priority}</p>
            </div>`;
          }

        function clearProjectPreview(){
            const projectPreview=document.getElementById("project-preview"); 
            projectPreview.innerHTML=``;   
        }


// console.log(Storage.getTodoList().projects.length);
// console.log(document.querySelector(".project-drop-down"));
// console.log(Storage.getTodoList().projects[0].name);

}