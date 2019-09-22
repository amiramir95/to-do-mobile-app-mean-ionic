import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
<<<<<<< HEAD
  { path: 'add-list', loadChildren: './pages/home/my-lists/add-list/add-list.module#AddListPageModule' }

=======
  {
    path: 'task',
    loadChildren:
      './pages/home/task/manage-task/manage-task.module#ManageTaskPageModule'
  }
>>>>>>> 051e33c10e96b76ba9b466eaf0e65fbe9ea15038
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
