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

  deleteList(listId: string) {
    // this.router.navigate(['/home']);
    return this.listService.deleteList(listId).subscribe(
      res => {
        console.log('list deleted' + this.userId);
        this.listService.getListByUser(this.userId);
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }
}
