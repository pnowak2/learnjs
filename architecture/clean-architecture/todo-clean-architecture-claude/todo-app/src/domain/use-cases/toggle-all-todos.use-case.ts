import { Todo } from '../entities/todo.entity';
import { TodoRepository } from '../ports/todo-repository.port';

export class ToggleAllTodosUseCase {
  constructor(private readonly repository: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    const todos = await this.repository.getAll();
    const allCompleted = todos.every((t) => t.completed);
    const updated = await Promise.all(
      todos
        .filter((t) => t.completed === allCompleted)
        .map((t) => this.repository.update(t.toggle()))
    );
    return updated;
  }
}
