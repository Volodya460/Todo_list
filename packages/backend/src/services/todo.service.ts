import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient();

export default class TodoService {
	// async findAll(ownerId: number): Promise<Todo[]> {
	// 	return prisma.todo.findMany({
	// 		where: {
	// 			ownerId,
	// 		},
	// 	});
	// }

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
					// 1️⃣ Если isPublic === true → получаем публичные Todo всех пользователей
					isPublic === true ? { isPublic: true } : {},

					// 2️⃣ Если isPublic === false → загружаем только задачи текущего пользователя
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
						: {}, // Если search не передан, фильтр не применяется
					completed !== undefined ? { completed } : {}, // Если completed не передан, фильтр не применяется
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
