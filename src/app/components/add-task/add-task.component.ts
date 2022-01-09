import { Component, OnInit,Output ,EventEmitter} from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  showAddTask: boolean = false;
  title: string = "";
  desc: string = "";
  reminder: boolean = false;
  subscription: Subscription;
  @Output() onAddTask: EventEmitter<Task>  = new EventEmitter();

  ngOnInit(): void {
  }

  constructor(private uiService: UiService){
    this.subscription =uiService.onToggle().subscribe((value) => this.showAddTask = value)
  }

onSubmit(){
  if(!this.title){
    alert("Please add a task!")
    return;
  }
  const newTask = {
    title: this.title,
    body: this.desc,
    reminder: this.reminder
  }

  this.title= '';
  this.desc = '';
  this.reminder = false;
  this.onAddTask.emit(newTask);
}

}
