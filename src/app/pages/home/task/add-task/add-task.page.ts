import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss']
})
export class AddTaskPage implements OnInit {
  task: Task;
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.task = new Task();
  }

  onSubmit() {
    this.task.state = false;
    this.task.userId = '5d8524a40b74db3244fdf951';
    this.taskService.addTask(this.task).subscribe(
      response => {
        console.log(response.message + 'Task id: ' + response.taskId);
      },
      err => {
        console.log('something went wrong');
      }
    );
  }
}
