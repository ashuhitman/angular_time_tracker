import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';
import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
  state
} from "@angular/animations";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  animations: [
    trigger("myTrigger", [
      state(
        "fadeInFlash",
        style({
          opacity: "0",
          transform: "translateY(-20px)"
        })
      ),
      transition("void => *", [
        style({ opacity: "1", transform: "translateY(0px)" }),
        animate("500ms")
      ])
    ])
  ]
})
export class TasksComponent implements OnInit {
  tasks: Task[]=[];
  state: string = "fadeInFlash";

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }
 deleteTask(task: Task){
 
this.taskService.deleteTask(task).subscribe(() => (this.tasks = this.tasks.filter(t => t._id !== task._id)))
 }

 updateReminderTask(task: Task){

   task.reminder = !task.reminder;
   this.taskService.updateTaskReminder(task).subscribe();
 }

 addTask(task: Task){

   this.taskService.addTask(task).subscribe((task) => this.tasks.unshift(task));
   
 }
 ngAfterViewInit() {}
 ngAfterContentInit() {}
}
