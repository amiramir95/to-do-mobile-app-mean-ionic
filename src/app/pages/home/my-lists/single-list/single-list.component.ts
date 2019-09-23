import { Component, OnInit, Input } from '@angular/core';

import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/list.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-list',
  templateUrl: './single-list.component.html',
  styleUrls: ['./single-list.component.scss']
})
export class SingleListComponent implements OnInit {
  @Input() list: List;
  userId: string;
  authSubscription: Subscription;

  constructor(
    private listService: ListService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.authSubscription = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userId = this.authService.getUserId();
      });
  }

  deleteListOld(listId: string) {
    // this.router.navigate(['/home']);
    /*return forkJoin(
      this.listService.deleteTaskByListId(listId), this.listService.deleteList(listId)
   ).subscribe(() => console.log('list deleted'));*/

    return this.listService
      .deleteTaskByListId(listId)
      .subscribe(() => console.log('tasks for list deleted'));
  }

  deleteList(listId: string) {
    this.listService.deleteTaskByListId(listId).subscribe(res1 => {
      this.listService.deleteList(listId).subscribe(res2 => {
        this.listService.getListByUser(this.userId);
        console.log('output first response');
        console.log(res1);
        console.log('output second response');
        console.log(res2);
      });
    });
  }
}
