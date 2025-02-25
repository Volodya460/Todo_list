import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { PassportStatic } from 'passport';

const prisma = new PrismaClient();

export function initializePassport(passport: PassportStatic): void {
	passport.use(
		new LocalStrategy(
			{ usernameField: 'email' },
			async (email: string, password: string, done) => {
				try {
					const user = await prisma.user.findUnique({
						where: { email },
					});

					if (!user) {
						return done(null, false, {
							message: 'No user with that email',
						});
					}

					const isMatch = await bcrypt.compare(
						password,
						user.password,
					);

					if (!isMatch) {
						return done(null, false, {
							message: 'Password incorrect',
						});
					}

					return done(null, user);
				} catch (error) {
					return done(error);
				}
			},
		),
	);

	// // Сериализация пользователя (хранение идентификатора в сессии)
	// passport.serializeUser((user, done) => {
	// 	done(null, user);
	// });

	// // Десериализация пользователя (поиск пользователя по идентификатору из сессии)
	// passport.deserializeUser(async (id: number, done) => {
	// 	try {
	// 		const user = await prisma.user.findUnique({ where: { id } });
	// 		done(null, user);
	// 	} catch (error) {
	// 		done(error);
	// 	}
	// });
}
