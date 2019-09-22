import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss'],
})
export class MyListsComponent implements OnInit {

  lists: List[];

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.getLists();
  }

  getLists() {
    this.listService.getListByUser();
    this.listService.getSubject().subscribe(
      lists => {
        this.lists = lists;
      },
      err => {
        console.log('something went wrong');
      }
    );
  }

}
