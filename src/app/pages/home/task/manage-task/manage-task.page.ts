import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ListTasksComponent } from '../list-tasks/list-tasks.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'manage-add-task',
  templateUrl: './manage-task.page.html',
  styleUrls: ['./manage-task.page.scss']
})
export class ManageTaskPage implements OnInit {
  form: FormGroup;
  task: Task;
  mode: string = '';
  postId: string;
  date: string;
  todayDate = new Date();
  today = new Date().toISOString().slice(0, 10);
  maxDate: string;
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const year = this.todayDate.getFullYear();
    const month = this.todayDate.getMonth();
    const day = this.todayDate.getDate();
    this.maxDate = new Date(year + 1, month, day).toISOString().slice(0, 10);
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dueDate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      })
    });
    this.task = new Task();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('taskId')) {
        // (async () => {
        this.mode = 'edit';
        /* await this.delay(200);
          })();*/

        this.postId = paramMap.get('taskId');
        this.taskService.getTask(this.postId).subscribe(taskt => {
          this.task.id = taskt.task._id;
          this.form.value.title = taskt.task.title;
          this.task.state = taskt.task.state;
          if (taskt.task.dueDate === null) {
            this.date = null;
          } else {
            this.date = new Date(taskt.task.dueDate).toISOString().slice(0, 10);
          }
          this.form.setValue({
            title: taskt.task.title,
            dueDate: this.date
          });
          this.task.createdAt = taskt.task.createdAt;
          this.task.userId = taskt.task.userId;
        });
      }
    });
  }

  onSubmit() {
    this.task.title = this.form.value.title;
    this.task.dueDate = new Date(this.form.value.dueDate)
      .toISOString()
      .slice(0, 10);

    if (this.mode !== 'edit') {
      this.task.state = false;
      this.task.userId = '5d8524a40b74db3244fdf951';

      console.log(typeof this.task.dueDate);
      console.log(JSON.stringify(this.task.dueDate));
      this.taskService.addTask(this.task).subscribe(
        response => {
          console.log(response.message + 'Task id: ' + response.taskId);
          this.taskService.getTasks();
        },
        err => {
          console.log('something went wrong');
        }
      );
    } else if (this.mode === 'edit') {
      console.log(this.task);
      this.taskService.updateTask(this.task).subscribe(reponse => {
        console.log(reponse.message);
        this.taskService.getTasks();
      });
    }
    this.router.navigate(['/home']);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
