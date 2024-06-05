import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddEditTaskComponent } from './components/add-edit-task/add-edit-task.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full',
  },
  { 
      path: 'tasks', 
      component: TaskListComponent,
  },
  { 
      path: 'tasks/add', 
      component: AddEditTaskComponent,
  },
  { 
      path: 'tasks/:id', 
      component: AddEditTaskComponent,
  },
  {
    path: '**',
    component: TaskListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
