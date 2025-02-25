import { z } from 'zod';

export const changePasswordSchema = z.object({
	oldPassword: z
		.string()
		.min(1, { message: 'Password is required' })
		.max(30, { message: 'Too long' })
		.refine(
			(value) => value.trim().length > 0,
			'Password cannot be only whitespace',
		),
	newPassword: z
		.string()
		.min(1, { message: 'Password is required' })
		.max(30, { message: 'Too long' })
		.refine(
			(value) => value.trim().length > 0,
			'Password cannot be only whitespace',
		),
});
