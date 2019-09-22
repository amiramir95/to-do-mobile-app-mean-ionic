  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { Routes, RouterModule } from '@angular/router';

  import { IonicModule } from '@ionic/angular';

  import { HomePage } from './home.page';
  import { MyListsComponent } from './my-lists/my-lists.component';
  import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { SingleListComponent } from './my-lists/single-list/single-list.component';

  const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

  @NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage, ListTasksComponent, MyListsComponent, SingleListComponent]
})
export class HomePageModule {}
