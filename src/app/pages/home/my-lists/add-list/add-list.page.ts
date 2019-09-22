import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/list.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.page.html',
  styleUrls: ['./add-list.page.scss']
})
export class AddListPage implements OnInit {
  list: List;
  editRouteActivated = false;
  listId: string;

  constructor(
    private listService: ListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.list = new List();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('listId')) {
        (async () => {
          this.editRouteActivated = true;
          await this.delay(200);
        })();

        this.listId = paramMap.get('listId');
        this.listService.getList(this.listId).subscribe(fetchedList => {
          this.list.id = fetchedList.list._id;
          this.list.name = fetchedList.list.name;
          this.list.userId = fetchedList.list.userId;
        });
      }
    });
  }

  onSubmit() {
    if (this.editRouteActivated === false) {
      this.list.userId = '1'; // get connected UserId
      this.listService.addList(this.list).subscribe(
        response => {
          console.log(response.message + 'List id: ' + response.listId);
        },
        err => {
          console.log('something went wrong');
        }
      );
    } else if (this.editRouteActivated === true) {
      this.listService.updateList(this.list).subscribe(reponse => {
        console.log(reponse.message);
      });
    }
    this.router.navigate(['/home']);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
