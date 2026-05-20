import { Component } from '@angular/core';
import { TodoShellComponent } from './components/todo-shell/todo-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoShellComponent],
  template: `<app-todo-shell />`,
})
export class App {}
