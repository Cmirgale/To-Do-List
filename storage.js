import Task from "./task.js";
import Project from "./project.js";
import ToDoList from "./todo.js";

export default class Storage{
    static saveTodoList(data) {
        localStorage.setItem('todoList', JSON.stringify(data));
      }

      static getTodoList() {
        // local storage doesn't store type of data so we have to convert it
        const todoList = Object.assign(
          new ToDoList(),
          JSON.parse(localStorage.getItem('todoList')),
        );
    
        todoList.setProjects(
          todoList
            .getProjects()
            .map((project) => Object.assign(new Project(), project)),
        );
    
        todoList
          .getProjects()
          .forEach((project) =>
            project.setTasks(
              project.getTasks().map((task) => Object.assign(new Task(), task)),
            ),
          );
    
        return todoList;
      }

      static addProject(project) {
        const todoList = Storage.getTodoList();
        todoList.addProject(project);
        Storage.saveTodoList(todoList);
      }
    
      static deleteProject(projectName) {
        const todoList = Storage.getTodoList();
        todoList.deleteProject(projectName);
        Storage.saveTodoList(todoList);
      }
    
      static addTask(projectName, task) {
        const todoList = Storage.getTodoList();
        todoList.getProject(projectName).addTask(task);
        Storage.saveTodoList(todoList);
      }
    
      static deleteTask(projectName, taskName) {
        const todoList = Storage.getTodoList();
        todoList.getProject(projectName).deleteTask(taskName);
        Storage.saveTodoList(todoList);
      }

}