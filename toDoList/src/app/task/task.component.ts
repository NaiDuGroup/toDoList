import { Component, Input } from '@angular/core';
import { TaskItem } from '../model/task-item';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  @Input() task: TaskItem;

  constructor(public toDoService: TodoService) {
  }
}
