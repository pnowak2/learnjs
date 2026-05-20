import { TodoRepository } from '../ports/todo-repository.port';

export class ClearCompletedUseCase {
  constructor(private readonly repository: TodoRepository) {}

  async execute(): Promise<void> {
    const todos = await this.repository.getAll();
    const completed = todos.filter((t) => t.completed);
    await Promise.all(completed.map((t) => this.repository.delete(t.id)));
  }
}
