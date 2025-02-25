import { z } from 'zod';

export const addSchema = z.object({
	title: z
		.string()
		.min(1, { message: 'Title is required' })
		.max(30, { message: 'Too long' })
		.refine(
			(value) => value.trim().length > 0,
			'Title cannot be only whitespace',
		),
	description: z.string(),
	isPublic: z.boolean(),
});
