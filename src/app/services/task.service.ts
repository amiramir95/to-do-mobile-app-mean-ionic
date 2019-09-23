import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private BASE_URL = 'http://localhost:3000/api/task';
  public ALL_TASKS_URL = `${this.BASE_URL}/byUser/`;
  private ADD_UPDATE_TASK_URL = `${this.BASE_URL}/`;
  private GET_TASK_URL = `${this.BASE_URL}/`;
  private DELETE_TASK_URL = `${this.BASE_URL}/`;

  dueDate1: Date;
  dueDate2: Date;

  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();

  constructor(private http: HttpClient) {}

  getTasks(userId: string) {
    return this.http
      .get<{ message: string; tasks: any }>(this.ALL_TASKS_URL + userId)
      .pipe(
        map(response => {
          return response.tasks.map(task => {
            return {
              id: task._id,
              title: task.title,
              state: task.state,
              createdAt: task.createdAt,
              dueDate: task.dueDate,
              listId: task.listId
            };
          });
        })
      )
      .pipe(map(task => task.filter(taskSingle => !taskSingle.state)))
      .subscribe(transformedTasks => {
        this.tasks = transformedTasks.sort((n1, n2) => {
          this.dueDate1 = new Date(n1.dueDate);
          this.dueDate2 = new Date(n2.dueDate);
          if (n1.dueDate === null && n2.dueDate === null) {
            return 0;
          }
          if (
            (n1.dueDate === null && n2.dueDate !== null) ||
            (n2.dueDate !== null && this.dueDate1 > this.dueDate2)
          ) {
            return 1;
          }
          if (
            (n2.dueDate === null && n1.dueDate !== null) ||
            (n1.dueDate !== null && this.dueDate1 < this.dueDate2)
          ) {
            return -1;
          }
          return 0;
        });
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  getSubject() {
    return this.tasksUpdated.asObservable();
  }

  getTask(taskId: string, userId: string) {
    return this.http.get<{ task: any }>(
      this.GET_TASK_URL + taskId + '/' + userId
    );
  }

  getTasksByListId(userId: string, listId: string) {
    return this.http
      .get<{ message: string; tasks: any }>(this.ALL_TASKS_URL + userId)
      .pipe(
        map(response => {
          return response.tasks.map(task => {
            return {
              id: task._id,
              title: task.title,
              state: task.state,
              createdAt: task.createdAt,
              dueDate: task.dueDate,
              listId: task.listId
            };
          });
        })
      )
      .pipe(
        map(task => task.filter(taskSingle => taskSingle.listId === listId))
      )
      .pipe(map(task => task.filter(taskSingle => !taskSingle.state)))
      .subscribe(transformedTasks => {
        this.tasks = transformedTasks.sort((n1, n2) => {
          this.dueDate1 = new Date(n1.dueDate);
          this.dueDate2 = new Date(n2.dueDate);
          if (n1.dueDate === null && n2.dueDate === null) {
            return 0;
          }
          if (
            (n1.dueDate === null && n2.dueDate !== null) ||
            (n2.dueDate !== null && this.dueDate1 > this.dueDate2)
          ) {
            return 1;
          }
          if (
            (n2.dueDate === null && n1.dueDate !== null) ||
            (n1.dueDate !== null && this.dueDate1 < this.dueDate2)
          ) {
            return -1;
          }
          return 0;
        });
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  addTask(task: Task) {
    return this.http.post<{ message: string; taskId: string }>(
      this.ADD_UPDATE_TASK_URL,
      task
    );
  }
  updateTask(task: Task) {
    return this.http.put<{ message: string; tasks: any }>(
      this.ADD_UPDATE_TASK_URL + task.id,
      task
    );
  }

  deleteList(tasktId: string) {
    return this.http.delete<{ message: string }>(
      this.DELETE_TASK_URL + tasktId
    );
  }
}
