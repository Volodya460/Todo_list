import { z } from 'zod';

export const resetPassword = z.object({
	password: z
		.string()
		.min(1, { message: 'Password is required' })
		.min(4, 'Too short your password')
		.refine(
			(value) => value.trim().length > 0,
			'Password cannot be only whitespace',
		),
	token: z.string().min(1, { message: 'Token is required' }),
});
