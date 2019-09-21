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
  private GET_PATH_BOOK_URL = `${this.BASE_URL}/path`;
  private ADD_UPDATE_BOOK_URL = `${this.BASE_URL}`;
  private DELETE_BOOK_URL = `${this.BASE_URL}/`;

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
      this.UPDATE_TASK_URL + 'id',
      {
        _id: task.id,
        title: task.title,
        state: task.state,
        createdAt: task.createdAt,
        dueDate: task.dueDate
      }
    );
  }

  /*
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.ALL_BOOKS_URL);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(this.GET_BOOK_URL + id);
  }

  getPath() {
    return this.http.get(this.GET_PATH_BOOK_URL, { responseType: 'text' });
  }

  getNumberofBooksAvailble(id: number): Observable<any> {
    return this.http.get<any>(this.AVAILBLE_BOOK_URL + id);
  }

  postBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.ADD_UPDATE_BOOK_URL, book);
  }*/
}
