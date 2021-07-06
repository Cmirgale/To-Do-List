export default class Project{
     constructor(name){
         this.name=name;
         this.tasks=[];
     }

     getProject(){
         return this.name;
     }

     setProject(name){
         this.name=name;
     }

     getTasks(){
        return this.tasks; 
     }

     setTasks(tasks){
         this.tasks=tasks;
     }

     getTask(taskname){
         return this.tasks.find((task)=>{task.getTitle()===taskname});
     }

     contains(taskname){
        return this.tasks.some((task)=>{task.getTitle()===taskname});
     }

     addTask(task){
         this.tasks.push(task);
     }

     deleteTask(taskname){
        const taskDelete=this.tasks.find((task)=>{task.getTitle()===taskname});
        this.tasks.splice(this.tasks.indexOf(taskDelete),1);
     }
}