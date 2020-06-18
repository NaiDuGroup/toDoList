import { Component } from '@angular/core';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent {

  name: string = '';

  constructor(private todoService: TodoService) { }

  addTask() {
    if (this.name != '' && !this.checkingForSpaces()) {
    this.todoService.addTask(this.name);
    this.name = '';
    }
  }

  public checkingForSpaces() : boolean {
    let numberOfSpaces = 0;
    for(let i = 0; i < this.name.length; i++) {
      if (this.name[i] == ' ') {
        numberOfSpaces++;
      }
    }
    return this.name.length == numberOfSpaces;
  }

}
