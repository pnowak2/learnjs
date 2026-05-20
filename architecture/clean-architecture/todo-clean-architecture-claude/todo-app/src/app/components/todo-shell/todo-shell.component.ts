import { Component } from '@angular/core';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoFilterComponent } from '../todo-filter/todo-filter.component';

@Component({
  selector: 'app-todo-shell',
  standalone: true,
  imports: [TodoFormComponent, TodoListComponent, TodoFilterComponent],
  template: `
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <app-todo-form />
      </header>
      <app-todo-list />
      <app-todo-filter />
    </section>
  `,
  styleUrl: './todo-shell.component.scss',
})
export class TodoShellComponent {}
