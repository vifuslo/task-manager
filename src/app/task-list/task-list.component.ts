import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../task.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  markAsCompleted(task: Task): void {
    task.completed = true;
    this.taskService.updateTask(task).subscribe(() => {
      this.loadTasks();
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.loadTasks();
    });
  }
}
