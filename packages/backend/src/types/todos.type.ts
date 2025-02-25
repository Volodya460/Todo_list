import { z } from 'zod';

export const todoSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	description: z.string().optional(),
	completed: z.boolean().optional(),
	isPublic: z.boolean().optional(),
	ownerId: z.string().optional(),
});
