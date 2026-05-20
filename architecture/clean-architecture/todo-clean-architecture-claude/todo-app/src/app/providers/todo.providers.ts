import { Provider } from '@angular/core';
import { TodoRepository } from '../../domain/ports/todo-repository.port';
import { LocalStorageTodoRepository } from '../../adapters/repositories/local-storage-todo.repository';
import { CreateTodoUseCase } from '../../domain/use-cases/create-todo.use-case';
import { GetAllTodosUseCase } from '../../domain/use-cases/get-all-todos.use-case';
import { ToggleTodoUseCase } from '../../domain/use-cases/toggle-todo.use-case';
import { RenameTodoUseCase } from '../../domain/use-cases/rename-todo.use-case';
import { DeleteTodoUseCase } from '../../domain/use-cases/delete-todo.use-case';
import { ClearCompletedUseCase } from '../../domain/use-cases/clear-completed.use-case';
import { FilterTodosUseCase } from '../../domain/use-cases/filter-todos.use-case';
import { ToggleAllTodosUseCase } from '../../domain/use-cases/toggle-all-todos.use-case';

// Each use case is constructed with the repo injected — Angular DI handles the graph.
function useCaseFactory<T>(ctor: new (repo: TodoRepository) => T) {
  return {
    provide: ctor,
    useFactory: (repo: TodoRepository) => new ctor(repo),
    deps: [TodoRepository],
  };
}

export const TODO_PROVIDERS: Provider[] = [
  { provide: TodoRepository, useClass: LocalStorageTodoRepository },

  useCaseFactory(CreateTodoUseCase),
  useCaseFactory(GetAllTodosUseCase),
  useCaseFactory(ToggleTodoUseCase),
  useCaseFactory(RenameTodoUseCase),
  useCaseFactory(DeleteTodoUseCase),
  useCaseFactory(ClearCompletedUseCase),
  useCaseFactory(ToggleAllTodosUseCase),

  // Stateless — no repo dependency.
  FilterTodosUseCase,
];
