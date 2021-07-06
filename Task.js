export default class Task{
    constructor(title,description,dueDate,priority){
        this.description=description;
        this.title=title;
        this.dueDate=dueDate;
        this.priority=priority;
    }

    getTitle(){
        return this.title;
    }

    setTitle(title){
        this.title=title;
    }

    getDueDate(){
        return this.dueDate;
    }

    setDueDate(dueDate){
        this.dueDate=dueDate;
    }

    getDescription(){
        return this.description;
    }

    setDescription(description){
        this.description=description;
    }

    getPriority(){
        return this.priority;
    }

    setPriority(priority){
        this.priority=priority;
    }
}