<<<<<<< HEAD
  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { Routes, RouterModule } from '@angular/router';
=======
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
>>>>>>> 051e33c10e96b76ba9b466eaf0e65fbe9ea15038

  import { IonicModule } from '@ionic/angular';

<<<<<<< HEAD
  import { HomePage } from './home.page';
  import { MyListsComponent } from './my-lists/my-lists.component';
  import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { SingleListComponent } from './my-lists/single-list/single-list.component';
=======
import { HomePage } from './home.page';
import { ListTasksComponent } from './task/list-tasks/list-tasks.component';
import { MyListsComponent } from './my-lists/my-lists.component';
import { SingleTaskComponent } from './task/list-tasks/single-task/single-task.component';
>>>>>>> 051e33c10e96b76ba9b466eaf0e65fbe9ea15038

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
<<<<<<< HEAD
  declarations: [HomePage, ListTasksComponent, MyListsComponent, SingleListComponent]
=======
  declarations: [
    HomePage,
    ListTasksComponent,
    MyListsComponent,
    SingleTaskComponent
  ]
>>>>>>> 051e33c10e96b76ba9b466eaf0e65fbe9ea15038
})
export class HomePageModule {}
