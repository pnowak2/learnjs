export interface TodoProps {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export class Todo {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
  readonly createdAt: Date;

  private constructor(props: TodoProps) {
    this.id = props.id;
    this.title = props.title;
    this.completed = props.completed;
    this.createdAt = props.createdAt;
  }

  static create(title: string): Todo {
    const trimmed = title.trim();
    if (trimmed.length === 0) {
      throw new Error('Todo title cannot be empty');
    }
    return new Todo({
      id: crypto.randomUUID(),
      title: trimmed,
      completed: false,
      createdAt: new Date(),
    });
  }

  static reconstitute(props: TodoProps): Todo {
    return new Todo(props);
  }

  toggle(): Todo {
    return new Todo({ ...this.toProps(), completed: !this.completed });
  }

  rename(title: string): Todo {
    const trimmed = title.trim();
    if (trimmed.length === 0) {
      throw new Error('Todo title cannot be empty');
    }
    return new Todo({ ...this.toProps(), title: trimmed });
  }

  toProps(): TodoProps {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed,
      createdAt: this.createdAt,
    };
  }
}
