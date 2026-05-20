import { Todo } from '../entities/todo.entity';
import { TodoRepository } from '../ports/todo-repository.port';

export class ToggleTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  async execute(id: string): Promise<Todo> {
    const todos = await this.repository.getAll();
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      throw new Error(`Todo with id "${id}" not found`);
    }
    const toggled = todo.toggle();
    return this.repository.update(toggled);
  }
}
