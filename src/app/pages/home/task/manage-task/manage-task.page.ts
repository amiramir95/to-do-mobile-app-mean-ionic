import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'manage-add-task',
  templateUrl: './manage-task.page.html',
  styleUrls: ['./manage-task.page.scss']
})
export class ManageTaskPage implements OnInit {
  task: Task;
  mode: string = '';
  postId: string;
  date: Date;
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.task = new Task();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('taskId')) {
        (async () => {
          // Do something before delay
          console.log('before delay');
          this.mode = 'edit';
          await this.delay(200);
          // Do something after
          console.log('after delay');
        })();

        this.postId = paramMap.get('taskId');
        this.taskService.getTask(this.postId).subscribe(taskt => {
          this.task.id = taskt.task._id;
          this.task.title = taskt.task.title;
          this.task.state = taskt.task.state;
          this.task.dueDate = new Date(taskt.task.dueDate)
            .toISOString()
            .slice(0, 10);
          this.task.createdAt = taskt.task.createdAt;
          this.task.userId = taskt.task.userId;
        });
      }
    });
  }

  onSubmit() {
    if (this.mode !== 'edit') {
      this.task.state = false;
      this.task.userId = '5d8524a40b74db3244fdf951';
      console.log(typeof this.task.dueDate);
      console.log(JSON.stringify(this.task.dueDate));
      this.taskService.addTask(this.task).subscribe(
        response => {
          console.log(response.message + 'Task id: ' + response.taskId);
        },
        err => {
          console.log('something went wrong');
        }
      );
    } else if (this.mode === 'edit') {
      console.log(this.task);
      this.taskService.updateTask(this.task).subscribe(reponse => {
        console.log(reponse.message);
      });
    }
    this.router.navigate(['/home']);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
