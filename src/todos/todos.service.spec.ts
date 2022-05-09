import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { ITodo } from './interfaces/todo.interface';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let todosService: TodosService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    todosService = module.get<TodosService>(TodosService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(todosService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('getAllTodos', () => {
    it('should return a todo list', async () => {
      // Arrange
      const expected: ITodo[] = [
        {
          userId: 1,
          id: 1,
          title: 'delectus aut autem',
          completed: false,
        },
      ];

      jest.spyOn(httpService, 'get').mockReturnValueOnce(
        of({
          status: 200,
          statusText: 'OK',
          config: {},
          headers: {},
          data: expected,
        }),
      );

      // Act
      const result = await todosService.getAllTodos();

      // Assert
      expect(result).toEqual(expected);
    });

    it('should return an empty array', async () => {
      // Arrange
      const expected: ITodo[] = [];

      jest.spyOn(httpService, 'get').mockReturnValueOnce(
        of({
          status: 204,
          statusText: 'NO CONTENT',
          config: {},
          headers: {},
          data: expected,
        }),
      );

      // Act
      const result = await todosService.getAllTodos();

      // Assert
      expect(result).toEqual(expected);
    });

    it('should throw an unexpected error', () => {
      // Arrange
      jest.spyOn(httpService, 'get').mockReturnValueOnce(throwError(new Error('deu ruim')));

      // Assert
      expect(todosService.getAllTodos()).rejects.toThrowError('deu ruim');
    });
  });
});
