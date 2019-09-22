import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManageTaskPage } from './manage-task.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ManageTaskPage
  },
  {
    path: ':taskId',
    component: ManageTaskPage
  },
  {
    path: 'delete/:taskId',
    component: ManageTaskPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManageTaskPage]
})
export class ManageTaskPageModule {}
