import { Component, OnInit, Input, EventEmitter,Output } from '@angular/core';
import {trigger,state,style,animate,transition} from '@angular/animations';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/Task';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        transform: "translateX(0%)",
        opacity: 1,
      })),
      state('closed', style({
        transform: "translateX(100%)",
        opacity: 0
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class TaskItemComponent implements OnInit {
  @Input() task:any;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onUpdateReminderTask: EventEmitter<Task> = new EventEmitter();
  faTimes = faTimes;
  isOpen = true;
  constructor() {
    
   }

  ngOnInit(): void {
    console.log(this.task);
    
  }

  onDelete(task: Task){
    this.onDeleteTask.emit(task);
    this.isOpen = false
    
  }

  onTaskReminder(task: Task){
    this.onUpdateReminderTask.emit(task);
 
  }

}
