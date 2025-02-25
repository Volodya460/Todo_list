import { Request, Response, NextFunction } from 'express';
import TodoService from '@/services/todo.service';
import HttpError from '@/helpers/httpErrors';

const todoService = new TodoService();

export const isExist = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const { id } = req.params;

	try {
		const todo = await todoService.findById(Number(id));
		if (!todo) {
			throw new HttpError(404, 'Todo not found');
		}
		next();
	} catch (error) {
		next(error);
	}
};
