import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from 'src/schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { ITodo } from './interface/todo.interface';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todos: Model<TodoDocument>) {}

  public async createTodo(contentTodo: CreateTodoDto): Promise<ITodo> {
    const createTodo = await this.todos.create(contentTodo);
    return createTodo;
  }

  public async findAll(query: PaginationQueryDto): Promise<Todo[]> {
    const { limit, offset } = query;
    return await this.todos.find().skip(offset).limit(limit);
  }

  public async findOne(_id: string): Promise<ITodo> {
    const todo = await this.todos.findOne({ _id });
    if (!todo) {
      throw new NotFoundException(`Todo Id : ${_id} not found!`);
    }
    return todo;
  }

  public async update(_id: string, update: object): Promise<ITodo> {
    const existTodo = await this.todos.findByIdAndUpdate({ _id }, update, {
      new: true,
    });
    if (!existTodo) {
      throw new NotFoundException(`Todo Id : ${_id} not found!`);
    }
    return existTodo;
  }

  public async remove(_id: string): Promise<any> {
    const deleted = await this.todos.deleteOne({ _id });
    return deleted;
  }

  public rootIndex(): object {
    let date = new Date();
    let weekday = new Array(7);
    weekday[0] = 'Sunday 🖖';
    weekday[1] = 'Monday 💪😀';
    weekday[2] = 'Tuesday 😜';
    weekday[3] = 'Wednesday 😌☕️';
    weekday[4] = 'Thursday 🤗';
    weekday[5] = 'Friday 🍻';
    weekday[6] = 'Saturday 😴';
    let day = weekday[date.getDay()];

    var randomWordArray = Array("Oh my, it's ", "Whoop, it's ", 'Happy ', "Seems it's ", "Awesome, it's ", 'Have a nice ', 'Happy fabulous ', 'Enjoy your ');
    var randomWord = randomWordArray[Math.floor(Math.random() * randomWordArray.length)];
    return { day, randomWord };
  }
}
