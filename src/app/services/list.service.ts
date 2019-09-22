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
  private UPDATE_DELETE_LIST_URL = `${this.BASE_URL}/`;

  private lists: List[] = [];
  private listsUpdated = new Subject<List[]>();

  constructor(private http: HttpClient) {}

  getListByUser() {
    // Get Connected User ID
    return this.http
      .get<{ lists: any }>(this.LISTS_BY_USER_URL + '1')
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

  addList(list: List) {
    return this.http.post<{ message: string; listId: string }>(
      this.BASE_URL,
      list
    );
  }

  deleteList(listId: string) {
    console.log(this.UPDATE_DELETE_LIST_URL + listId);
    return this.http.delete<{ message: string; }>(
      this.UPDATE_DELETE_LIST_URL + listId
    );
  }

  getSubject() {
    return this.listsUpdated.asObservable();
  }
}
