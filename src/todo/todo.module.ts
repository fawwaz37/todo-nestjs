import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo, TodoSchema } from 'src/schemas/todo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
