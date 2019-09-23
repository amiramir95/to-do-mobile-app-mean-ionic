import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeTasksPage } from './home-tasks.page';
import { ListTasksComponent } from '../task/list-tasks/list-tasks.component';
import { SingleTaskComponent } from '../task/list-tasks/single-task/single-task.component';

const routes: Routes = [
  {
    path: '',
    component: HomeTasksPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeTasksPage, ListTasksComponent, SingleTaskComponent]
})
export class HomeTasksPageModule {}
