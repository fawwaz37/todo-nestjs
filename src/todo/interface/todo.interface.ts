import { TodoDocument } from 'src/schemas/todo.schema';

export interface ITodo extends TodoDocument {
  content: string;
  status: string;
}
