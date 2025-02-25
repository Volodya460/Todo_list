import HttpError from '@/helpers/httpErrors';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export default class UserService {
	async register(data: {
		username: string;
		email: string;
		password: string;
		token?: string;
		verificationCode: string;
	}): Promise<User | null> {
		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [{ email: data.email }, { username: data.username }],
			},
		});

		if (existingUser) {
			const conflictField =
				existingUser.email === data.email ? 'email' : 'username';
			throw new HttpError(
				409,
				`User with this ${conflictField} already exists`,
			);
		}
		return prisma.user.create({ data });
	}

	async updateToken(userId: number, token: string): Promise<User> {
		return prisma.user.update({
			where: { id: userId },
			data: { token },
		});
	}

	async updatePassword(id: number, password: string): Promise<void> {
		await prisma.user.update({ where: { id: id }, data: { password } });
	}

	async logout(id: number): Promise<void> {
		await prisma.user.update({
			where: { id },
			data: { token: '' },
		});
	}

	async updateUser(
		id: number,
		data: { username: string; email: string },
	): Promise<User> {
		return prisma.user.update({ where: { id: id }, data });
	}

	async resetPassword(email: string, password: string): Promise<User> {
		return await prisma.user.update({
			where: { email: email },
			data: { password },
		});
	}

	async findById(id: number): Promise<User | null> {
		return prisma.user.findUnique({ where: { id } });
	}
	async findByVerify(verificationCode: string): Promise<User | null> {
		return prisma.user.findFirst({ where: { verificationCode } });
	}

	async findByEmail(email: string): Promise<User | null> {
		return prisma.user.findFirst({ where: { email } });
	}
	async updateVarify(id: number): Promise<User | null> {
		return prisma.user.update({
			where: { id: id },
			data: { verify: true, verificationCode: '' },
		});
	}
}
