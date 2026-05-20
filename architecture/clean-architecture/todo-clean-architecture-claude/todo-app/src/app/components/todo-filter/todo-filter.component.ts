import { Component, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FilterTypes } from '../../../domain/value-objects/filter.value-object';
import { TodoFacadeService } from '../../services/todo-facade.service';

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [TitleCasePipe],
  template: `
    @let facade = todoFacade;
    @if (facade.todos().length > 0) {
      <footer class="footer">
        <span class="todo-count">
          <strong>{{ facade.activeCount() }}</strong>
          {{ facade.activeCount() === 1 ? 'item' : 'items' }} left
        </span>

        <ul class="filters">
          @for (f of filters; track f) {
            <li>
              <button
                [class.selected]="facade.filter() === f"
                (click)="facade.setFilter(f)"
              >{{ f | titlecase }}</button>
            </li>
          }
        </ul>

        @if (facade.completedCount() > 0) {
          <button class="clear-completed" (click)="facade.clearCompleted()">
            Clear completed
          </button>
        }
      </footer>
    }
  `,
  styleUrl: './todo-filter.component.scss',
})
export class TodoFilterComponent {
  protected readonly todoFacade = inject(TodoFacadeService);
  protected readonly filters = FilterTypes;
}
