import { Component, ElementRef, ViewChild } from '@angular/core';
import { Task } from 'src/app/dtos/task';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  // @ViewChild('confirmationModal') confirmationModal: ElementRef;
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filter = '';
  page = 1;
  pageSize = 10;
  math = Math;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filterTasks();
    });
  }

  deleteTask(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.filteredTasks=this.filteredTasks.filter(task=> task.id !== id);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      });
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'The Task Not Deleted :)',
          'error'
        );
      }
    });
    
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter(task =>
      task.title.includes(this.filter) || task.body?.includes(this.filter)
    );
  }

  get paginatedTasks(): Task[] {
    const startIndex = (this.page - 1) * this.pageSize;
    return this.filteredTasks.slice(startIndex, startIndex + this.pageSize);
  }
}
