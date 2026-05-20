import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoFacadeService } from '../../services/todo-facade.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form class="todo-form" (ngSubmit)="submit()">
      <input
        class="todo-input"
        type="text"
        placeholder="What needs to be done?"
        [(ngModel)]="title"
        name="title"
        autofocus
      />
    </form>
  `,
  styleUrl: './todo-form.component.scss',
})
export class TodoFormComponent {
  private readonly facade = inject(TodoFacadeService);

  title = '';

  async submit(): Promise<void> {
    const trimmed = this.title.trim();
    if (!trimmed) return;
    await this.facade.add(trimmed);
    this.title = '';
  }
}
