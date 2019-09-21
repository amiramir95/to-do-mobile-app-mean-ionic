import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  tasks: Task[];
  //  private taskSubscription: Subscription;
  constructor(
    private taskService: TaskService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks();
    this.taskService.getSubject().subscribe(
      tasks => {
        this.tasks = tasks;
      },
      err => {
        console.log('something went wrong');
      }
    );
  }

  onTaskCompleted(task: Task) {
    this.deleteTask(task);
  }

  deleteTask(task: Task) {
    this.tasks.forEach((item, index) => {
      if (item === task) {
        this.tasks.splice(index, 1);
      }
    });
  }
}
