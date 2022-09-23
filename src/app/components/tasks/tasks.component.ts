import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import {Task} from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
      myTask : Task = {
          label: '',
          completed: false,
        
      };
  
  
  tasks: Task[] = [];
  task: any;



  constructor(private taskservice: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks(): void {
    this.taskservice.findAll()
    .subscribe(tasks=> this.tasks = tasks )
  }
  deleteTask(id)   {

    this.taskservice.delete(id)
    .subscribe(()=> {
      this.tasks = this.tasks.filter(task =>task.id != id)
  })


  }
  
  persistTask(){
    this.taskservice.persist(this.myTask).subscribe((task)=>{
      this.tasks = [task,...this.tasks]})
    }

  
}