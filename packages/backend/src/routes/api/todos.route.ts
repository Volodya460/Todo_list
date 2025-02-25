import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import { ctrlWrapper } from '@/middlewares/ctrlWrapper';
import { isExist } from '@/middlewares/isExist';
import { validate } from '@/middlewares/validator';
import { todoSchema } from '@/types/todos.type';
import { authenticate } from '@/middlewares/authmMiddleware';

const todosRouter: Router = Router();

todosRouter.get(
	'/all',
	authenticate,
	ctrlWrapper(todoController.getAllTodo.bind(todoController)),
);

todosRouter.get(
	'/:id',
	authenticate,
	isExist,
	ctrlWrapper(todoController.getTodoById.bind(todoController)),
);

todosRouter.post(
	'/',
	authenticate,
	validate(todoSchema),
	ctrlWrapper(todoController.createTodo.bind(todoController)),
);

todosRouter.put(
	'/:id',
	authenticate,
	isExist,
	validate(todoSchema),
	ctrlWrapper(todoController.updateTodo.bind(todoController)),
);

todosRouter.delete(
	'/:id',
	authenticate,
	isExist,
	ctrlWrapper(todoController.deleteTodo.bind(todoController)),
);

export default todosRouter;
