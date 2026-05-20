import { Component, inject } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoFacadeService } from '../../services/todo-facade.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent],
  template: `
    @let facade = todoFacade;
    <section class="main" [class.hidden]="facade.todos().length === 0">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        [checked]="facade.allCompleted()"
        (change)="facade.toggleAll()"
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        @for (todo of facade.filteredTodos(); track todo.id) {
          <app-todo-item [todo]="todo" />
        }
      </ul>
    </section>
  `,
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  protected readonly todoFacade = inject(TodoFacadeService);
}
