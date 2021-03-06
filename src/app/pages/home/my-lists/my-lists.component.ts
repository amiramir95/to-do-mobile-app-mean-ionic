import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss']
})
export class MyListsComponent implements OnInit, OnDestroy {
  lists: List[];
  userId: string;
  userIsAuthenticated = false;
  private listSubscription: Subscription;
  private authStatusSub: Subscription;

  constructor(
    private listService: ListService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.listSubscription = this.listService.getSubject().subscribe(lists => {
      this.lists = lists;
    });
    (async () => {
      this.userId = this.authService.getUserId();
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
        });
      await this.delay(200);
      this.getLists();
    })();
  }

  getLists() {
    this.listService.getListByUser(this.userId);
    this.listService.getSubject().subscribe(
      lists => {
        this.lists = lists;
      },
      err => {
        console.log('something went wrong');
      }
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.listSubscription.unsubscribe();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
