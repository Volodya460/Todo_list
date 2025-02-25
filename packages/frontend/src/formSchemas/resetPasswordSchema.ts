import { z } from 'zod';

export const resetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(1, { message: 'Password is required' })
			.min(4, 'Too short your password')
			.refine(
				(value) => value.trim().length > 0,
				'Password cannot be only whitespace',
			),
		confirmPassword: z.string(),
	})
	.refine((data) => data.confirmPassword === data.password, {
		path: ['confirmPassword'],
		message: 'Password dont match',
	});
