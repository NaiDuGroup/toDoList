import { Injectable } from '@angular/core';
import { TaskItem } from '../model/task-item';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  localStorageKey = 'key';

  $tasks: BehaviorSubject<TaskItem[]>;
  tasks: TaskItem[] = [];

  $amountOfTasks: BehaviorSubject<number>;


  constructor() {
    this.tasks = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];

    this.$tasks = new BehaviorSubject<TaskItem[]>(this.tasks);
    console.log(this.$tasks);
    //this.$tasks.next(this.tasks);

    this.$amountOfTasks = new BehaviorSubject<number>(this.tasks.length);
    console.log('length: ', this.$amountOfTasks);
    //this.$amountOfTasks.next(this.tasks.length);
  }

  public addTask(name: string) { // CREATE
      this.tasks.push(new TaskItem(new uuidv4(), name));
      localStorage.setItem(this.localStorageKey,JSON.stringify(this.tasks));
      this.$tasks.next(this.tasks);
      this.$amountOfTasks.next(this.tasks.length);
  }

  public getTasks(): Observable<TaskItem[]> { // READ
    console.log(this.tasks);
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
