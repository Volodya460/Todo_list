import { Router, Request, Response } from 'express';
import userController from '../../controllers/user.controller';
import { ctrlWrapper } from '@/middlewares/ctrlWrapper';
import { validate } from '@/middlewares/validator';
import { registerSchema } from '@/types/register.type';
import { authenticate } from '@/middlewares/authmMiddleware';
import { LoginSchema } from '@/types/login.type';
import { emailSchema } from '@/types/email.type';
import { resetPassword } from '@/types/resetPassword';
const userRouter: Router = Router();

userRouter.post(
	'/register',
	validate(registerSchema),
	ctrlWrapper(userController.registerUser.bind(userController)),
);
userRouter.post(
	'/login',
	validate(LoginSchema),
	ctrlWrapper(userController.loginUser.bind(userController)),
);

userRouter.post(
	'/logout',
	authenticate,
	ctrlWrapper(userController.logoutUser.bind(userController)),
);

userRouter.get(
	'/verify/:verificationCode',

	ctrlWrapper(userController.verifyEmail.bind(userController)),
);

userRouter.post(
	'/verify',
	validate(emailSchema),
	ctrlWrapper(userController.resendVerifyEmail.bind(userController)),
);

userRouter.post(
	'/forgot-password',
	validate(emailSchema),
	ctrlWrapper(userController.forgotPassword.bind(userController)),
);

userRouter.post(
	'/reset-password',
	validate(resetPassword),
	ctrlWrapper(userController.resetPassword.bind(userController)),
);

userRouter.put(
	'/:id',
	authenticate,
	ctrlWrapper(userController.updateUser.bind(userController)),
);
userRouter.patch(
	'/password/:id',
	authenticate,
	ctrlWrapper(userController.updatePassword.bind(userController)),
);

userRouter.get(
	'/current',
	authenticate,
	ctrlWrapper(userController.getCurrentUser.bind(userController)),
);
export default userRouter;
