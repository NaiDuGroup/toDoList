import { Component } from '@angular/core';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  name: string = '';

  constructor(private todoService: TodoService) { }

  addTask() {
    if (this.name.trim() != '') {
    this.todoService.addTask(this.name);
    this.name = '';
    }
  }

}
