import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ versionKey: false })
export class Todo {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  status: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
