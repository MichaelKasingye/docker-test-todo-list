import { Todo } from "../models/todo";
import { TodoRepository } from "../repositories/todos";

const HttpErrors = require('../utils/http-errors');

class TodoService {
    private readonly todoRepository: typeof TodoRepository;
  
    constructor() {
        this.todoRepository = TodoRepository;
       
    }

   
    public async createTodo(body:any ): Promise<Todo[]> {
        
        const todo = this.todoRepository.create(body);

        const saveTodo = await this.todoRepository.save(todo);
        return saveTodo;
    }


    /**
     * Retrieve get all.
     * @returns {Promise<Todo>} Todo.
     */
    public getAll = async (): Promise<Todo[]> => {
        const allTodos: any = await this.todoRepository.find();
        return allTodos;
    };

    /**
     * Retrieve todo by id.
     * @param id Todo id.
     * @returns {Promise<Todo>} Todo.
     */
    public async getById(todoId: string): Promise<Todo> {
        const todo: any = await this.todoRepository.findOne({
            where: { id: todoId },
        });

        return todo;
    }

    // get todo by todo Id and Hotel id
   

    /**
     * Soft delete todo by id.
     * @param id Todo id.
     * @returns {Promise<Todo>} Soft delete todo.
     */
    public async softDelete(
        id: string,
    ): Promise<any> {
        // Check if user belongs to the hotel
        return await this.todoRepository.softDelete(id);
    }

    /**
     * Restore soft deleted todo by id.
     * @param id address id.
     * @returns {Promise<Address>} Restore soft deleted todo.
     */
    public async restoreSoftDelete(id: string): Promise<any> {
        return await this.todoRepository.restore(id);
    }

}

export default new TodoService();
