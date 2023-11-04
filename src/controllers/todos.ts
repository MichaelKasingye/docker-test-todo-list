import { Request, Response } from 'express';
import TodoService from '../services/todos';
const HttpErrors = require('../utils/http-errors');

class TodosController {
    private readonly todoService: typeof TodoService;

    constructor() {
        this.todoService = TodoService;
    }

    public createTodos = async (req: Request, res: Response) => {
        try {
            const todosData = req.body;
            const { todoId, reservationId } = req.params;
            const todos: any = await this.todoService.createTodo(
                todosData
            );
            
            res.status(201).json(todos);

        } catch (error) {
            console.error('Error creating todos:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    public getAllTodos = async (req: Request, res: Response) => {
        const todoss = await TodoService.getAll();
        return res.status(200).json({
            status: 'OK',
            todoss,
        });
    };

    //

    public getTodosById = async (req: Request, res: Response) => {
        const todos = await TodoService.getById(req.params.id);
        if (!todos) {
            return res.status(404).send({
                status: 'NOT_FOUND',
                message: `todos not found.`,
            });
        }
        return res.status(200).json({
            status: 'OK',
            todos,
        });
    };

   

    public softDeleteTodos = async (req: Request, res: Response) => {
        const { todoId } = req.params;

        const softDelete = await TodoService.softDelete(
            todoId
        );

        if (softDelete === null) {
            return res.status(200).json({
                status: 'NOT_FOUND',
                message: 'User is not associated with the todo',
            });
        }
        return res.status(200).json({
            status: 'NO_CONTENT',
            message: 'todos deleted successfully.',
        });
    };

    public restoreSoftDeletedTodos = async (req: Request, res: Response) => {

        const todoss = await TodoService.restoreSoftDelete(
            req.params.todosId
        );
        return res.status(200).json({
            status: 'CONTENT_RESTORED',
            message: 'Todos restored successfully.',
        });
    };

   
}

export default new TodosController();
