import {
  Component,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../../domain/entities/todo.entity';
import { TodoFacadeService } from '../../services/todo-facade.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [FormsModule],
  template: `
    @let item = todo();
    <li class="todo-item" [class.completed]="item.completed" [class.editing]="isEditing()">
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          [checked]="item.completed"
          (change)="facade.toggle(item.id)"
        />
        <label (dblclick)="startEdit()">{{ item.title }}</label>
        <button class="destroy" (click)="facade.delete(item.id)"></button>
      </div>
      @if (isEditing()) {
        <input
          #editInput
          class="edit"
          type="text"
          [(ngModel)]="editTitle"
          name="edit"
          (blur)="commitEdit()"
          (keyup.enter)="commitEdit()"
          (keyup.escape)="cancelEdit()"
        />
      }
    </li>
  `,
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  readonly todo = input.required<Todo>();

  protected readonly facade = inject(TodoFacadeService);

  private readonly editInput = viewChild<ElementRef<HTMLInputElement>>('editInput');

  readonly isEditing = signal(false);
  editTitle = '';

  startEdit(): void {
    this.editTitle = this.todo().title;
    this.isEditing.set(true);
    // Focus after Angular renders the input
    setTimeout(() => this.editInput()?.nativeElement.focus(), 0);
  }

  async commitEdit(): Promise<void> {
    if (!this.isEditing()) return;
    this.isEditing.set(false);
    const trimmed = this.editTitle.trim();
    if (trimmed && trimmed !== this.todo().title) {
      await this.facade.rename(this.todo().id, trimmed);
    }
  }

  cancelEdit(): void {
    this.isEditing.set(false);
    this.editTitle = '';
  }
}
