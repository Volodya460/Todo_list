import { Response, Request } from 'express';
import TodoService from '@/services/todo.service';
import HttpError from '@/helpers/httpErrors';
import { Todo, User } from '@prisma/client';
import { boolean } from 'zod';

export class TodoController {
	private todoService: TodoService;

	constructor(todoService: TodoService) {
		this.todoService = todoService;
	}

	getAllTodo = async (req: Request, res: Response): Promise<void> => {
		if (!req.user) {
			throw new HttpError(401, 'Unauthorized');
		}
		const { id } = req.user as User;
		const search = req.query.search as string | undefined;
		const status = req.query.status as string | undefined;
		const publicParam = req.query.public as string | undefined;

		const completed =
			status === 'completed'
				? true
				: status === 'pending'
					? false
					: undefined;
		const isPublic =
			publicParam === 'true'
				? true
				: publicParam === 'false'
					? false
					: undefined;
		const todos = await this.todoService.findFAll(
			id,
			search,
			completed,
			isPublic,
		);
		res.status(200).json(todos);
	};

	getTodoById = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		const todo = await this.todoService.findById(Number(id));
		if (!todo) {
			throw new HttpError(404, 'Not found');
		}
		res.status(200).json(todo);
	};
	createTodo = async (req: Request, res: Response): Promise<void> => {
		const { title, description, isPublic } = req.body;
		if (!req.user) {
			throw new HttpError(401, 'Unauthorized');
		}
		const { id } = req.user as User;

		const newTodo = await this.todoService.create({
			title,
			description,
			completed: false,
			isPublic,
			ownerId: id,
		});

		res.status(201).json(newTodo);
	};

	updateTodo = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		const { title, description, completed, isPublic } = req.body;
		if (!req.user) {
			throw new HttpError(401, 'Unauthorized');
		}
		const todo = await this.todoService.findById(Number(id));
		const { id: userId } = req.user as User;
		if (!todo || todo.ownerId !== userId) {
			throw new HttpError(403, 'Forbidden');
		}
		const updatedTodo = await this.todoService.update(Number(id), {
			title,
			description,
			completed,
			isPublic,
		});

		if (!updatedTodo) {
			throw new HttpError(404, 'Not found');
		}

		res.status(200).json(updatedTodo);
	};

	deleteTodo = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		if (!req.user) {
			throw new HttpError(401, 'Unauthorized');
		}

		const userTodo = await this.todoService.findById(Number(id));

		const { id: userId } = req.user as User;
		if (!userTodo || userTodo.ownerId !== userId) {
			throw new HttpError(403, 'Forbidden');
		}
		const todo = await this.todoService.delete(Number(id));

		if (!todo) {
			throw new HttpError(404, 'Not found');
		}

		res.status(204).json(todo);
	};
}

const todoController = new TodoController(new TodoService());
export default todoController;
