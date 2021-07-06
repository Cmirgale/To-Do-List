import * as task from "./Task.js";
import * as project from "./Project.js";


export default class ToDoList{
    constructor(){
        this.projects=[];
    }

    setProjects(projects) {
      this.projects = projects;
    }
    
    getProjects() {
      return this.projects;
    }

    getProject(projectName) {
        return this.projects.find((project) => project.getProject() === projectName);
    }
    
    contains(projectName) {
        return this.projects.some((project) => project.getProject() === projectName);
    }
    
    addProject(project) {
        this.projects.push(project);
    }
    
    deleteProject(projectName) {
      const projectToDelete = this.projects.find(
        (project) => project.getProject() === projectName);
      this.projects.splice(this.projects.indexOf(projectToDelete), 1);
    }
    
}