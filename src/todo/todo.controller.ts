import {
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  Query,
  Param,
  Put,
  Delete,
  Render,
  Req,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Types } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  @Render('index')
  public async todoIndex(@Query() query: PaginationQueryDto) {
    const array = await this.todoService.findAll(query);

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

    var randomWordArray = Array(
      "Oh my, it's ",
      "Whoop, it's ",
      'Happy ',
      "Seems it's ",
      "Awesome, it's ",
      'Have a nice ',
      'Happy fabulous ',
      'Enjoy your ',
    );
    var randomWord =
      randomWordArray[Math.floor(Math.random() * randomWordArray.length)];

    return { day, randomWord, todos: array };
  }

  @Post('/data')
  public async addTodo(@Res() res: any, @Body() contentTodo: CreateTodoDto) {
    try {
      const createTodo = await this.todoService.createTodo(contentTodo);
      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        message: 'Success Create Todo',
        data: createTodo,
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      });
    }
  }

  @Get('/data')
  public async getAllTodo(@Res() res: any, @Query() query: PaginationQueryDto) {
    const array = await this.todoService.findAll(query);
    return res.status(HttpStatus.OK).send({
      statusCode: HttpStatus.OK,
      message: 'Success Get All Todo',
      data: array,
    });
  }

  @Get('/data/:id')
  public async getOneTodo(@Res() res: any, @Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Wrong Type Id');
    }
    const todo = await this.todoService.findOne(id);
    return res.status(HttpStatus.OK).send({
      statusCode: HttpStatus.OK,
      message: 'Success Get One Todo',
      data: todo,
    });
  }

  @Put('/data/:id')
  public async updateTodo(
    @Res() res: any,
    @Param('id') id: string,
    @Req() req: any,
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Wrong Type Id');
    }
    try {
      let { status } = req.body;
      const todo = await this.todoService.update(id, { status });
      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        message: 'Success Update One Todo',
        data: todo,
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.BAD_REQUEST).send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Todo Not Updated',
      });
    }
  }

  @Delete('/data/:id')
  public async deleteTodo(@Res() res: any, @Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Wrong Type Id');
    }
    const remove = await this.todoService.remove(id);
    return res.status(HttpStatus.OK).send({
      statusCode: HttpStatus.OK,
      message: 'Success Delete One Todo',
      data: remove,
    });
  }
}
