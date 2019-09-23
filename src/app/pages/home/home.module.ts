import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MyListsComponent } from './my-lists/my-lists.component';
import { SingleListComponent } from './my-lists/single-list/single-list.component';
import { ListTasksComponent } from './task/list-tasks/list-tasks.component';
import { SingleTaskComponent } from './task/list-tasks/single-task/single-task.component';
import { IonicModule } from '@ionic/angular';

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
  declarations: [HomePage, MyListsComponent, SingleListComponent]
})
export class HomePageModule {}
