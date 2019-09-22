import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.page.html',
  styleUrls: ['./add-list.page.scss'],
})
export class AddListPage implements OnInit {
  list: List;
  constructor(private listService: ListService) { }

  ngOnInit() {
    this.list = new List();
  }

  onSubmit() {
    this.list.userId = '1'; //get connected UserId
    this.listService.addList(this.list).subscribe(
      response => {
        console.log(response.message + 'List id: ' + response.listId);
      },
      err => {
        console.log('something went wrong');
      }
    );
  }

}
