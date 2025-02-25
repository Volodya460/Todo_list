import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient();

export default class TodoService {
	async findFAll(
		ownerId: number,
		search?: string,
		completed?: boolean,
		isPublic?: boolean,
	): Promise<Todo[]> {
		console.log(search);
		return prisma.todo.findMany({
			where: {
				OR: [
					isPublic === true ? { isPublic: true } : {},

					isPublic === false || isPublic === undefined
						? { ownerId }
						: {},
				],
				AND: [
					search
						? {
								OR: [
									{
										title: {
											contains: search,
											mode: 'insensitive',
										},
									},
								],
							}
						: {},
					completed !== undefined ? { completed } : {},
				],
			},
		});
	}

	async findById(id: number): Promise<Todo | null> {
		return prisma.todo.findUnique({ where: { id } });
	}

	async create(data: {
		title: string;
		description?: string;
		completed?: boolean;
		isPublic?: boolean;
		ownerId: number;
	}): Promise<Todo> {
		return prisma.todo.create({ data });
	}

	async update(
		id: number,
		data: {
			title?: string;
			description?: string;
			completed?: boolean;
			isPublic: boolean;
		},
	): Promise<Todo> {
		return prisma.todo.update({ where: { id }, data });
	}

	async delete(id: number): Promise<Todo> {
		return prisma.todo.delete({ where: { id } });
	}
}
