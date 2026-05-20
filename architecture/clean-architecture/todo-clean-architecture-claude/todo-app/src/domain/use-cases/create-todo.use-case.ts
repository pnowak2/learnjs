import { Todo } from '../entities/todo.entity';
import { TodoRepository } from '../ports/todo-repository.port';

export class CreateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  async execute(title: string): Promise<Todo> {
    const todo = Todo.create(title);
    return this.repository.save(todo);
  }
}
