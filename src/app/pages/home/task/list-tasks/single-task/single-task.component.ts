import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss']
})
export class SingleTaskComponent implements OnInit {
  @Input() task: Task;
  constructor(private taskService: TaskService) {}

  ngOnInit() {}

  onTaskCompleted() {
    this.task.state = true;
    this.taskService.updateTask(this.task);
  }
}
