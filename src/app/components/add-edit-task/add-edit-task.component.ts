import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/dtos/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})
export class AddEditTaskComponent {
  taskForm: FormGroup;
  taskId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      body: [''],
      status: ['Todo', Validators.required],
      priority: ['Low', Validators.required],
      creationDate: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.getTask(this.taskId);
    }
  }

  getTask(id: string): void {
    this.taskService.getTask(id).subscribe(task => {
      this.taskForm.patchValue(task);
    });
  }

  onSubmit(): void {
    const task: Task = {
      ...this.taskForm.value,
      id: this.taskId ? this.taskId : this.generateId(),
      creationDate: this.taskForm.value.creationDate || new Date()
    };

    if (this.taskId) {
      this.taskService.updateTask(task).subscribe(() => this.router.navigate(['/tasks']));
    } else {
      this.taskService.addTask(task).subscribe(() => this.router.navigate(['/tasks']));
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
