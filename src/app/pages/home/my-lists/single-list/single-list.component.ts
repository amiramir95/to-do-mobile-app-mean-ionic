import { Component, OnInit, Input } from '@angular/core';


import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-single-list',
  templateUrl: './single-list.component.html',
  styleUrls: ['./single-list.component.scss'],
})
export class SingleListComponent implements OnInit {
  @Input() list: List;

  constructor(private listService: ListService) { }

  ngOnInit() {}

  deleteList(listId: string) {
    // this.router.navigate(['/home']);
    return this.listService.deleteList(listId).subscribe(() => console.log('list deleted'));
  }

}
