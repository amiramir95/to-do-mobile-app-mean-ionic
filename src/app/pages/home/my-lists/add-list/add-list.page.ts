import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/list.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.page.html',
  styleUrls: ['./add-list.page.scss']
})
export class AddListPage implements OnInit {
  list: List;
  editRouteActivated = false;
  listId: string;

  authSubscription: Subscription;
  userIsAuthenticated = false;
  connectedUserId: string;

  constructor(
    private listService: ListService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.list = new List();

    (async () => {
      this.authSubscription = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.connectedUserId = this.authService.getUserId();
        });

      this.connectedUserId = this.authService.getUserId();
      await this.delay(1000);
    })();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('listId')) {
        (async () => {
          this.editRouteActivated = true;
          await this.delay(50);
        })();

        this.listId = paramMap.get('listId');
        this.listService.getList(this.listId).subscribe(fetchedList => {
          this.list.id = fetchedList.list.id;
          this.list.name = fetchedList.list.name;
          this.list.userId = fetchedList.list.userId;
        });
      }
    });
  }

  onSubmit() {
    this.list.id = this.listId;
    if (this.editRouteActivated === false) {
      this.list.userId = this.connectedUserId; // get connected UserId
      this.listService.addList(this.list).subscribe(
        response => {
          console.log(response.message + 'List id: ' + response.listId);
          this.listService.getListByUser(this.connectedUserId);
        },
        err => {
          console.log('something went wrong');
        }
      );
    } else if (this.editRouteActivated === true) {
      this.listService.updateList(this.list).subscribe(reponse => {
        console.log(reponse.message);
        this.listService.getListByUser(this.connectedUserId);
      });
    }
    this.router.navigate(['/home']);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
