import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit, OnDestroy {
  tasks: Task[];
  private taskSubscription: Subscription;
  userId: string;
  userIsAuthenticated = false;
  routeHasParam = false;
  arrayEmpty = false;
  listId: string;
  private authSubscription: Subscription;
  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.taskSubscription = this.taskService.getSubject().subscribe(
      tasks => {
        this.tasks = tasks;
      },
      err => {
        console.log('something went wrong');
      }
    );
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('listId')) {
        /* (async () => {
          await this.delay(50);
        })();*/
        this.routeHasParam = true;
        this.listId = paramMap.get('listId');
      }
    });
    (async () => {
      this.userId = this.authService.getUserId();
      this.userIsAuthenticated = this.authService.getIsAuth();

      await this.delay(200);
      this.authSubscription = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
        });
      await this.delay(200);
      this.getTasks();
      await this.delay(200);
      if (this.tasks.length === 0) {
        this.arrayEmpty = true;
      }
    })();
  }

  getTasks() {
    if (this.routeHasParam) {
      this.taskService.getTasksByListId(this.userId, this.listId);
    } else {
      this.taskService.getTasks(this.userId);
    }
    this.taskSubscription = this.taskService.getSubject().subscribe(
      tasks => {
        this.tasks = tasks;
      },
      err => {
        console.log('something went wrong');
      }
    );
  }

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
