import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss']
})
export class SingleTaskComponent implements OnInit {
  @Input() task: Task;
  @Output() taskCompleted = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<Task>();
  dateColor: string;
  listName: string;
  todayDate = new Date();
  userId: string;
  authSubscription: Subscription;
  constructor(
    private taskService: TaskService,
    private listService: ListService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const dueDate = new Date(this.task.dueDate);
    if (this.todayDate > dueDate) {
      this.dateColor = 'danger';
    } else {
      this.dateColor = 'tertiary';
    }
    (async () => {
      this.userId = this.authService.getUserId();
      this.authSubscription = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userId = this.authService.getUserId();
        });
      await this.delay(100);
      if (this.task.listId) {
        this.listService.getList(this.task.listId).subscribe(list => {
          this.listName = list.list.name;
        });
      }
      await this.delay(100);
    })();
  }

  onTaskCompleted() {
    this.task.state = true;
    (async () => {
      await this.delay(500);
      this.taskService.updateTask(this.task).subscribe(response => {
        console.log(response.message);
        this.taskCompleted.emit(this.task);
        this.taskService.getTasks(this.userId);
      });
    })();
  }

  onDeletedTask() {
    this.taskService.deleteList(this.task.id).subscribe(response => {
      console.log(response.message);
      this.taskDeleted.emit(this.task);
      this.taskService.getTasks(this.userId);
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
