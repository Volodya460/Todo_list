import { z } from 'zod';

export const updateSchema = z.object({
	username: z
		.string()
		.min(1, { message: 'Name is required' })
		.refine(
			(value) => value.trim().length > 0,
			'Name cannot be only whitespace',
		),
	email: z
		.string()
		.min(1, { message: 'Email is required' })
		.min(4, 'Too short your email')
		.email({ message: 'Invalid email address' })
		.refine(
			(value) => value.trim().length > 0,
			'Email cannot be only whitespace',
		),
});
