import HttpError from '@/helpers/httpErrors';
import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validate =
	(
		schema: ZodSchema,
	): ((req: Request, res: Response, next: NextFunction) => void) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			console.log(req.body);
			schema.parse(req.body);
			return next();
		} catch (error) {
			if (error instanceof ZodError) {
				throw new HttpError(400, 'Error in case of failed validation');
			}

			return next(error);
		}
	};
