import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private LISTS_BASE_URL = 'http://localhost:3000/api/lists';
  private TASKS_BASE_URL = 'http://localhost:3000/api/task';
  private LISTS_BY_USER_URL = `${this.LISTS_BASE_URL}/userId/`;
  private GET_UPDATE_DELETE_LIST_URL = `${this.LISTS_BASE_URL}/`;
  private DELETE_USER_TASKS_BY_LIST = `${this.TASKS_BASE_URL}/`;

  private lists: List[] = [];
  private listsUpdated = new Subject<List[]>();

  constructor(private http: HttpClient) {}

  getListByUser(userId: string) {
    // Get Connected User ID
    return this.http
      .get<{ lists: any }>(this.LISTS_BY_USER_URL + userId)
      .pipe(
        map(response => {
          return response.lists.map(list => {
            return {
              id: list._id,
              name: list.name,
              userId: list.userId
            };
          });
        })
      )
      .subscribe(transformedLists => {
        this.lists = transformedLists;
        this.listsUpdated.next([...this.lists]);
      });
  }

  getList(listId: string) {
    return this.http.get<{ list: List }>(
      this.GET_UPDATE_DELETE_LIST_URL + listId
    );
  }

  addList(list: List) {
    return this.http.post<{ message: string; listId: string }>(
      this.LISTS_BASE_URL,
      list
    );
  }

  updateList(list: List) {
    return this.http.put<{ message: string; updatedList: any }>(
      this.GET_UPDATE_DELETE_LIST_URL + list.id,
      list
    );
  }

  deleteTasksByListIdAndUserId(listId: string, userId: string) {
    return this.http.delete<{ message: string }>(
      this.GET_UPDATE_DELETE_LIST_URL + listId + '/' + userId
    );
  }

  deleteList(listId: string) {
    const list = this.getList(listId);
    this.deleteTasksByListIdAndUserId(list.id, list.userId);
    return this.http.delete<{ message: string }>(
      this.GET_UPDATE_DELETE_LIST_URL + listId
    );
  }

  getSubject() {
    return this.listsUpdated.asObservable();
  }
}
