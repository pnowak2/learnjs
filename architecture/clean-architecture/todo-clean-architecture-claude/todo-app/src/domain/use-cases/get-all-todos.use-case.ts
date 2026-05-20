import { Todo } from '../entities/todo.entity';
import { TodoRepository } from '../ports/todo-repository.port';

export class GetAllTodosUseCase {
  constructor(private readonly repository: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    return this.repository.getAll();
  }
}
