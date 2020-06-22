import { Injectable } from '@angular/core';
import { TaskItem } from '../model/task-item';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  index: number = 0;
  localStorageKey = 'key';

  $tasks: BehaviorSubject<TaskItem[]>;
  tasks: TaskItem[] = [];

  $amountOfTasks: BehaviorSubject<number>;


  constructor() {
    this.tasks = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    this.index = this.tasks.length + 1;

    this.$tasks = new BehaviorSubject<TaskItem[]>(this.tasks);
    console.log(this.$tasks);
    //this.$tasks.next(this.tasks);

    this.$amountOfTasks = new BehaviorSubject<number>(this.tasks.length);
    console.log('length: ', this.$amountOfTasks);
    //this.$amountOfTasks.next(this.tasks.length);
  }

  public addTask(name: string) { // CREATE
      this.tasks.push(new TaskItem(this.index, name));
      this.index++;
      localStorage.setItem(this.localStorageKey,JSON.stringify(this.tasks));
      this.$tasks.next(this.tasks);
      this.$amountOfTasks.next(this.tasks.length);
  }

  public getTasks(): Observable<TaskItem[]> { // READ
    return  this.$tasks.asObservable();
  }

  public updateTask(id: number) { // UPDATE
    this.tasks = this.tasks.map(task => {
      if(task.id === id) {
        task.isDone = !task.isDone;
      }
      return task
    });
    localStorage.setItem(this.localStorageKey,JSON.stringify(this.tasks));
    this.$tasks.next(this.tasks);
    this.$amountOfTasks.next(this.tasks.length);
  }

  public removeTask(id: number) { // DELETE
    this.tasks = this.tasks.filter((task) => task.id !== id);
    localStorage.setItem(this.localStorageKey,JSON.stringify(this.tasks));
    this.$tasks.next(this.tasks);
    this.$amountOfTasks.next(this.tasks.length);
  }

  public getAmountOfTasks(): Observable<number> {
    return this.$amountOfTasks.asObservable();
  }
  
}
