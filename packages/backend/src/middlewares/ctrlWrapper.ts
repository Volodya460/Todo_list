import { Request, Response, NextFunction } from 'express';

export const ctrlWrapper =
	(
		controller: (
			req: Request,
			res: Response,
			next: NextFunction,
		) => Promise<void>,
	) =>
	(req: Request, res: Response, next: NextFunction): void => {
		controller(req, res, next).catch(next);
	};
