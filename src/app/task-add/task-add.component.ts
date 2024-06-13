import { TaskListComponent } from './../task-list/task-list.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../task.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, TaskListComponent],
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent {
  newTaskTitle: string = '';
  allTasks: Task[]  = [];
  taskWithHighestId: Task | undefined;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadTaskWithHighestId();
    console.log(this.allTasks + ' ' + this.taskWithHighestId?.id);
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.allTasks = tasks;
    });
  }

  loadTaskWithHighestId(): void {
    this.taskService.getTaskWithHighestId().subscribe(task => {
      this.taskWithHighestId = task;
    });
  }

  addTask(): void {
    if (this.newTaskTitle.trim()) {
      const newId = (this.taskWithHighestId?.id ?? 0) + 1;
      const newTask: Task = {
        id: this.allTasks.length + 1,  // Esto será reemplazado por la API
        title: this.newTaskTitle,
        completed: false
      };

      this.taskService.addTask(newTask).subscribe(() => {
        this.newTaskTitle = '';
      });
    }
  }
}

