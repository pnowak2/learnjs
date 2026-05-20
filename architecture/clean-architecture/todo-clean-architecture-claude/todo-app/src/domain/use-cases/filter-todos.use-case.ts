import { Todo } from '../entities/todo.entity';
import { FilterType } from '../value-objects/filter.value-object';

// Pure domain logic — no repository, no async, no side effects.
export class FilterTodosUseCase {
  execute(todos: Todo[], filter: FilterType): Todo[] {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }
}
