import { Injectable } from '@angular/core';
import { Todo, TodoProps } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/ports/todo-repository.port';

const STORAGE_KEY = 'clean-todo-app';

@Injectable()
export class LocalStorageTodoRepository extends TodoRepository {
  private readAll(): TodoProps[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as Array<TodoProps & { createdAt: string }>;
      return parsed.map((p) => ({ ...p, createdAt: new Date(p.createdAt) }));
    } catch {
      return [];
    }
  }

  private writeAll(todos: Todo[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.map((t) => t.toProps())));
  }

  async getAll(): Promise<Todo[]> {
    return this.readAll().map(Todo.reconstitute);
  }

  async save(todo: Todo): Promise<Todo> {
    const all = this.readAll().map(Todo.reconstitute);
    this.writeAll([...all, todo]);
    return todo;
  }

  async update(todo: Todo): Promise<Todo> {
    const all = this.readAll().map(Todo.reconstitute);
    const next = all.map((t) => (t.id === todo.id ? todo : t));
    this.writeAll(next);
    return todo;
  }

  async delete(id: string): Promise<void> {
    const all = this.readAll().map(Todo.reconstitute);
    this.writeAll(all.filter((t) => t.id !== id));
  }
}
