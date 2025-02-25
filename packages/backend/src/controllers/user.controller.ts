import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nanoid from 'nanoid';
import { User } from '@prisma/client';
import passport from 'passport';
import { generateToken } from '@/middlewares/authmMiddleware';
import UserService from '@/services/user.service';
import HttpError from '@/helpers/httpErrors';
import { sendMail } from '@/helpers/sendEmail';
const BASE_URL = 'https://todo-list-byfp.onrender.com';
const SECRET_KEY = process.env.SECRET_KEY as string;

export class UserController {
	private userService: UserService;

	constructor(userService: UserService) {
		this.userService = userService;
	}

	registerUser = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { username, email, password } = req.body;
			const hashedPassword = await bcrypt.hash(password, 10);
			const verificationCode = nanoid();
			const user = await this.userService.register({
				username,
				email,
				password: hashedPassword,
				verificationCode,
			});
			if (!user) {
				throw new HttpError(400, 'User registration failed');
			}
			const verifyEmail = {
				to: email,
				subject: 'Verify email',
				html: `<a target="_blank" href="${BASE_URL}/api/user/verify/${verificationCode}">Click verify email</a>`,
			};
			await sendMail(verifyEmail);
			res.status(201).json({
				message: 'User registered successfully',
				user: {
					id: user.id,
					username: user.username,
					email: user.email,
				},
			});
		} catch (error) {
			next(error);
		}
	};

	loginUser = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		passport.authenticate(
			'local',
			async (
				err: Error | null,
				user: User | false,
				info: { message?: string } | undefined,
			) => {
				if (err) {
					return next(err);
				}

				if (!user) {
					return next(
						new HttpError(401, info?.message || 'Unauthorized'),
					);
				}
				if (!user.verify) {
					return next(new HttpError(401, 'Email not verify'));
				}

				const newToken = generateToken({ id: user.id }, '1d');

				const updateUser = await this.userService.updateToken(
					user.id,
					newToken,
				);

				res.status(200).json({
					message: 'Logged in successfully',
					token: updateUser.token,
					user: {
						id: updateUser.id,
						username: updateUser.username,
						email: updateUser.email,
					},
				});
			},
		)(req, res, next);
	};
	verifyEmail = async (req: Request, res: Response) => {
		const { verificationCode } = req.params;
		const user = await this.userService.findByVerify(verificationCode);
		if (!user) {
			throw new HttpError(404, 'Email not found');
		}

		await this.userService.updateVarify(user.id);

		res.json({
			message: 'Email verify success',
		});
	};

	resendVerifyEmail = async (req: Request, res: Response): Promise<void> => {
		const { email } = req.body;

		const user = await this.userService.findByEmail(email);
		if (!user) {
			throw new HttpError(404, 'Email not found');
		}
		if (user.verify) {
			throw new HttpError(404, 'Email already verify');
		}

		const verifyEmail = {
			to: email,
			subject: 'Verify email',
			html: `<a target="_blank" href="${BASE_URL}/api/user/verify/${user.verificationCode}">Click verify email</a>`,
		};
		await sendMail(verifyEmail);

		res.json({
			message: 'Verify email send successfully',
		});
	};

	forgotPassword = async (req: Request, res: Response) => {
		const { email } = req.body;
		const user = await this.userService.findByEmail(email);
		if (!user) {
			throw new HttpError(404, 'Email not found');
		}

		const token = generateToken({ email }, '1h');
		const resetUrl = `http://localhost:5173/reset-password?token=${token}`;
		const forgotPassword = {
			to: email,
			subject: 'Forgot Password',
			html: `
			<p>If you want to reset password,click here.</p>
			 <a href="${resetUrl}">${resetUrl}</a>`,
		};
		await sendMail(forgotPassword);
	};

	resetPassword = async (req: Request, res: Response) => {
		const { password, token } = req.body;
		const payload = jwt.verify(token, SECRET_KEY) as { email: string };
		const hashedPassword = await bcrypt.hash(password, 10);

		const updateUser = await this.userService.resetPassword(
			payload.email,
			hashedPassword,
		);

		if (!updateUser) {
			throw new HttpError(400, 'Invalid token');
		}
		res.status(200).json({ message: 'Password change successfully' });
	};

	getCurrentUser = async (req: Request, res: Response) => {
		const { email, username, id } = req.user as User;

		res.json({
			user: { id, username, email },
		});
	};

	updateUser = async (req: Request, res: Response) => {
		const { id } = req.params;
		const { username, email } = req.body;

		const user = await this.userService.findById(Number(id));
		if (!user) {
			throw new HttpError(404, 'Not found');
		}

		const updateUser = await this.userService.updateUser(Number(id), {
			username,
			email,
		});
		if (!updateUser) {
			throw new HttpError(404, 'Not found');
		}

		res.status(200).json(updateUser);
	};

	updatePassword = async (req: Request, res: Response) => {
		const { id } = req.params;
		const { oldPassword, newPassword } = req.body;

		const user = await this.userService.findById(Number(id));
		if (!user) {
			throw new HttpError(404, 'Not found');
		}
		const passwordCompare = await bcrypt.compare(
			oldPassword,
			user.password,
		);
		if (!passwordCompare) {
			throw new HttpError(400, 'Incorrect old password');
		}
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		await this.userService.updatePassword(Number(id), hashedPassword);

		res.status(200).json({ message: 'Password updated successfully' });
	};
	logoutUser = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.user as User;
		await this.userService.logout(id);
		res.status(200).json({ message: 'Logged out successfully' });
	};
}

const userController = new UserController(new UserService());
export default userController;
