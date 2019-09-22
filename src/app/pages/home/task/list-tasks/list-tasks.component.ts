import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit, OnDestroy {
  tasks: Task[];
  private taskSubscription: Subscription;
  constructor(
    private taskService: TaskService,
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
    this.taskService.getTasks();
  }

  getTasks() {
    this.taskService.getTasks();
    this.taskSubscription = this.taskService.getSubject().subscribe(
      tasks => {
        this.tasks = tasks;
      },
      err => {
        console.log('something went wrong');
      }
    );
  }

  /*onTaskCompleted(task: Task) {
    //    this.deleteTask(task);
    this.taskService.getTasks();
  }

  onTaskDeleted(task: Task) {
    //    this.deleteTask(task);
    this.taskService.getTasks();
  }*/
  /* deleteTask(task: Task) {
    this.tasks.forEach((item, index) => {
      if (item === task) {
        this.tasks.splice(index, 1);
      }
    });
  }*/

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
