import { Todo } from '../entities/todo.entity';

export abstract class TodoRepository {
  abstract getAll(): Promise<Todo[]>;
  abstract save(todo: Todo): Promise<Todo>;
  abstract update(todo: Todo): Promise<Todo>;
  abstract delete(id: string): Promise<void>;
}
