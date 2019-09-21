import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private BASE_URL = 'http://localhost:3000/api/task';
  public ALL_TASKS_URL = `${this.BASE_URL}/`;
  private UPDATE_TASK_URL = `${this.BASE_URL}/`;

  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http
      .get<{ message: string; tasks: any }>(this.ALL_TASKS_URL)
      .pipe(
        map(response => {
          return response.tasks.map(task => {
            return {
              id: task._id,
              title: task.title,
              state: task.state,
              createdAt: task.createdAt,
              dueDate: task.dueDate
            };
          });
        })
      )
      .pipe(map(task => task.filter(taskSingle => !taskSingle.state)))
      .subscribe(transformedTasks => {
        this.tasks = transformedTasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  getSubject() {
    return this.tasksUpdated.asObservable();
  }

  updateTask(task: Task) {
    return this.http.put<{ message: string; tasks: any }>(
      this.UPDATE_TASK_URL + task.id,
      task
    );
  }
}
