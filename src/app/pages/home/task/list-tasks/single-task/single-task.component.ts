import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss']
})
export class SingleTaskComponent implements OnInit {
  @Input() task: Task;
  @Output() taskCompleted = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<Task>();
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  onTaskCompleted() {
    this.task.state = true;
    (async () => {
      await this.delay(500);
      this.taskService.updateTask(this.task).subscribe(response => {
        console.log(response.message);
        this.taskCompleted.emit(this.task);
        this.taskService.getTasks();
      });
    })();
  }

  onDeletedTask() {
    this.taskService.deleteList(this.task.id).subscribe(response => {
      console.log(response.message);
      this.taskDeleted.emit(this.task);
      this.taskService.getTasks();
    });
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
