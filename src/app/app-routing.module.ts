import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './pages/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'add-list',
    loadChildren:
      './pages/home/my-lists/add-list/add-list.module#AddListPageModule',
    canActivate: [AuthGuard]
  },

  {
    path: 'task',
    loadChildren:
      './pages/home/task/manage-task/manage-task.module#ManageTaskPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'auth', loadChildren: './pages/auth/auth.module#AuthPageModule' },
  {
    path: 'home-tasks',
    loadChildren:
      './pages/home/home-tasks/home-tasks.module#HomeTasksPageModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
