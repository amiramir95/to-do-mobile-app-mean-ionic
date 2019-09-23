import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ListTasksComponent } from '../list-tasks/list-tasks.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'manage-add-task',
  templateUrl: './manage-task.page.html',
  styleUrls: ['./manage-task.page.scss']
})
export class ManageTaskPage implements OnInit {
  form: FormGroup;
  task: Task;
  mode: string = '';
  taskId: string;
  date: string;
  userId: string;
  lists: List[] = [];
  todayDate = new Date();
  currentListName: string;
  today = new Date().toISOString().slice(0, 10);
  authSubscription: Subscription;
  listSubscription: Subscription;
  maxDate: string;
  newDate: Date;
  userIsAuthenticated = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private listService: ListService,
    private authService: AuthService
  ) {
    const year = this.todayDate.getFullYear();
    const month = this.todayDate.getMonth();
    const day = this.todayDate.getDate();
    this.maxDate = new Date(year + 1, month, day).toISOString().slice(0, 10);
  }

  ngOnInit() {
    this.listSubscription = this.listService.getSubject().subscribe(
      lists => {
        this.lists = lists;
      },
      err => {
        console.log('something went wrong');
      }
    );
    (async () => {
      this.authSubscription = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
        });
      this.userId = this.authService.getUserId();
      await this.delay(200);
      this.listService.getListByUser(this.userId);
    })();

    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dueDate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      listId: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      })
    });
    this.task = new Task();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('taskId')) {
        this.mode = 'edit';
        this.taskId = paramMap.get('taskId');
        this.taskService.getTask(this.taskId, this.userId).subscribe(taskt => {
          this.task.id = taskt.task._id;
          this.form.value.title = taskt.task.title;
          this.task.state = taskt.task.state;
          this.form.value.listId = taskt.task.listId;
          if (taskt.task.dueDate === null) {
            this.date = null;
          } else {
            this.date = new Date(taskt.task.dueDate).toISOString().slice(0, 10);
          }
          (async () => {
            this.form.patchValue({
              title: taskt.task.title,
              dueDate: this.date
            });
          })();
          this.task.createdAt = taskt.task.createdAt;
          this.task.userId = taskt.task.userId;
        });
      }
    });
    /*    this.listService.getList(this.form.value.listId).subscribe(
      list=>{
        this.lists.find(x => x.id == this.fo);
      }
    )
    */
  }

  onSubmit() {
    this.task.title = this.form.value.title;
    this.task.listId = this.form.value.listId;
    if (this.form.value.dueDate === null) {
      this.task.dueDate = null;
    } else {
      if (this.task.listId === null) {
        const date = new Date(this.form.value.dueDate);
        this.newDate = new Date(date.getTime() + 1000 * 60 * 60 * 24);
      } else {
        this.newDate = this.form.value.dueDate;
      }
      console.log('new Date: ' + this.form.value.dueDate);
      this.task.dueDate = new Date(this.newDate).toISOString().slice(0, 10);
      console.log(this.form.value.dueDate);
    }
    if (this.mode !== 'edit') {
      this.task.state = false;
      this.task.userId = this.userId;
      this.taskService.addTask(this.task).subscribe(
        response => {
          console.log(response.message + 'Task id: ' + response.taskId);
          this.taskService.getTasks(this.userId);
        },
        err => {
          console.log('something went wrong');
        }
      );
    } else if (this.mode === 'edit') {
      (async () => {
        this.taskService.getTask(this.taskId, this.userId).subscribe(task => {
          this.task.listId = task.task.listId;
        });
        await this.delay(200);
        this.taskService.updateTask(this.task).subscribe(reponse => {
          console.log(reponse.message);
          this.taskService.getTasks(this.userId);
        });
      })();
    }
    this.router.navigate(['/home-tasks']);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
