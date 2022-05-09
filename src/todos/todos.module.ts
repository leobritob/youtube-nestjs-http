import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [HttpModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
