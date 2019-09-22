import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private BASE_URL = 'http://localhost:3000/api/lists';
  private LISTS_BY_USER_URL = `${this.BASE_URL}/userId/`;
  private GET_UPDATE_DELETE_LIST_URL = `${this.BASE_URL}/`;

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
    return this.http.get<{ list: any }>(
      this.GET_UPDATE_DELETE_LIST_URL + listId
    );
  }

  addList(list: List) {
    return this.http.post<{ message: string; listId: string }>(
      this.BASE_URL,
      list
    );
  }

  updateList(list: List) {
    return this.http.put<{ message: string; updatedList: any }>(
      this.GET_UPDATE_DELETE_LIST_URL + list.id,
      list
    );
  }

  deleteList(listId: string) {
    console.log(this.GET_UPDATE_DELETE_LIST_URL + listId);
    return this.http.delete<{ message: string }>(
      this.GET_UPDATE_DELETE_LIST_URL + listId
    );
  }

  getSubject() {
    return this.listsUpdated.asObservable();
  }
}
