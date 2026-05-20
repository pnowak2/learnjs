import { computed, inject, Injectable, signal } from '@angular/core';
import { FilterType } from '../../domain/value-objects/filter.value-object';
import { Todo } from '../../domain/entities/todo.entity';
import { CreateTodoUseCase } from '../../domain/use-cases/create-todo.use-case';
import { GetAllTodosUseCase } from '../../domain/use-cases/get-all-todos.use-case';
import { ToggleTodoUseCase } from '../../domain/use-cases/toggle-todo.use-case';
import { RenameTodoUseCase } from '../../domain/use-cases/rename-todo.use-case';
import { DeleteTodoUseCase } from '../../domain/use-cases/delete-todo.use-case';
import { ClearCompletedUseCase } from '../../domain/use-cases/clear-completed.use-case';
import { FilterTodosUseCase } from '../../domain/use-cases/filter-todos.use-case';
import { ToggleAllTodosUseCase } from '../../domain/use-cases/toggle-all-todos.use-case';

@Injectable({ providedIn: 'root' })
export class TodoFacadeService {
  private readonly createUseCase = inject(CreateTodoUseCase);
  private readonly getAllUseCase = inject(GetAllTodosUseCase);
  private readonly toggleUseCase = inject(ToggleTodoUseCase);
  private readonly renameUseCase = inject(RenameTodoUseCase);
  private readonly deleteUseCase = inject(DeleteTodoUseCase);
  private readonly clearCompletedUseCase = inject(ClearCompletedUseCase);
  private readonly filterUseCase = inject(FilterTodosUseCase);
  private readonly toggleAllUseCase = inject(ToggleAllTodosUseCase);

  private readonly _todos = signal<Todo[]>([]);
  private readonly _filter = signal<FilterType>('all');
  private readonly _loading = signal(false);

  readonly todos = this._todos.asReadonly();
  readonly filter = this._filter.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly filteredTodos = computed(() =>
    this.filterUseCase.execute(this._todos(), this._filter())
  );

  readonly activeCount = computed(
    () => this._todos().filter((t) => !t.completed).length
  );

  readonly completedCount = computed(
    () => this._todos().filter((t) => t.completed).length
  );

  readonly allCompleted = computed(
    () => this._todos().length > 0 && this._todos().every((t) => t.completed)
  );

  constructor() {
    this.load();
  }

  async load(): Promise<void> {
    this._loading.set(true);
    try {
      this._todos.set(await this.getAllUseCase.execute());
    } finally {
      this._loading.set(false);
    }
  }

  async add(title: string): Promise<void> {
    const created = await this.createUseCase.execute(title);
    this._todos.update((todos) => [...todos, created]);
  }

  async toggle(id: string): Promise<void> {
    const updated = await this.toggleUseCase.execute(id);
    this._todos.update((todos) => todos.map((t) => (t.id === id ? updated : t)));
  }

  async toggleAll(): Promise<void> {
    await this.toggleAllUseCase.execute();
    this._todos.set(await this.getAllUseCase.execute());
  }

  async rename(id: string, title: string): Promise<void> {
    const updated = await this.renameUseCase.execute(id, title);
    this._todos.update((todos) => todos.map((t) => (t.id === id ? updated : t)));
  }

  async delete(id: string): Promise<void> {
    await this.deleteUseCase.execute(id);
    this._todos.update((todos) => todos.filter((t) => t.id !== id));
  }

  async clearCompleted(): Promise<void> {
    await this.clearCompletedUseCase.execute();
    this._todos.update((todos) => todos.filter((t) => !t.completed));
  }

  setFilter(filter: FilterType): void {
    this._filter.set(filter);
  }
}
