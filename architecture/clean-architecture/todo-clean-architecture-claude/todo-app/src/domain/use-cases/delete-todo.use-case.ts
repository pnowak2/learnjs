import { TodoRepository } from '../ports/todo-repository.port';

export class DeleteTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
