import HttpError from '@/helpers/httpErrors';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const SECRET_KEY = process.env.SECRET_KEY as string;

export type TokenPayload = { id?: number; email?: string };

export function generateToken(payload: TokenPayload, time: string) {
	return jwt.sign(payload, SECRET_KEY, { expiresIn: time });
}

export async function authenticate(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	const { authorization } = req.headers;

	if (!authorization) {
		return next(new HttpError(401, 'Authorization header missing'));
	}

	const [bearer, token] = authorization.split(' ');

	if (bearer !== 'Bearer' || !token) {
		return next(new HttpError(401, 'Invalid token format'));
	}

	try {
		const payload = jwt.verify(token, SECRET_KEY) as { id: number };

		const user = await prisma.user.findUnique({
			where: { id: payload.id },
		});

		if (!user || !user.token || user.token !== token) {
			return next(new HttpError(401, 'Unauthorized'));
		}

		req.user = user as User;
		console.log(req.user);
		next();
	} catch {
		next(new HttpError(401, 'Unauthorized'));
	}
}
