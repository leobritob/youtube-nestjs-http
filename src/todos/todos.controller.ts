import { Controller, Get } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('api/v1/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async index() {
    return await this.todosService.getAllTodos();
  }
}
