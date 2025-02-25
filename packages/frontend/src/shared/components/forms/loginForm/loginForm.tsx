import * as React from 'react';
import { useForm } from 'react-hook-form';
import { LoginParams } from '~typings/global';
import { zodResolver } from '@hookform/resolvers/zod';
import { DivError, Form, LoginH1, SendP } from './loginForm.styles';
import { useUserStore } from '~store/user.store';
import { loginSchema } from '~/formSchemas/loginSchema';
import Button from '~shared/components/button/button.component';
import { SendEmailForm } from '../sendEmailForm/sendEmailForm';
import { useLocation } from 'react-router-dom';
import Loader from '~shared/components/loader/loader.component';

export const LoginForm = () => {
	const [isVisible, setIsVisible] = React.useState(false);
	const sendMessage = useUserStore((state) => state.sendVerifyMessage);
	const sendMessageForgot = useUserStore((state) => state.forgotPassword);
	const isLoading = useUserStore((state) => state.isLoading);
	const location = useLocation();

	const toggleVisibility = () => {
		setIsVisible((prev) => !prev);
	};
	const login = useUserStore((state) => state.login);
	const { register, handleSubmit, formState, reset } = useForm<LoginParams>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(loginSchema),
	});
	const { errors } = formState;
	const onSubmit = (e: LoginParams): void => {
		const { email, password } = e;
		const user = { email, password };
		login(user);
		reset({
			email: '',
			password: '',
		});
	};
	return (
		<div>
			<LoginH1>Login</LoginH1>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<label>
					<span>Email</span>

					<input
						{...register('email')}
						type="email"
						placeholder="Enter your email"
					/>
					<DivError>{errors.email?.message}</DivError>
				</label>
				<label>
					<span>Password</span>

					<input
						{...register('password')}
						type="password"
						placeholder="Enter your password"
					/>
					<DivError>{errors.password?.message}</DivError>
				</label>
				{isLoading ? (
					<Loader />
				) : (
					<Button type={'submit'} text={'Sign in'} />
				)}
			</Form>

			{location?.state?.from ? (
				<>
					{' '}
					<SendP onClick={toggleVisibility}>
						Send verify message again
					</SendP>
					{isVisible && <SendEmailForm sendMessage={sendMessage} />}
				</>
			) : (
				<>
					{' '}
					<SendP onClick={toggleVisibility}>Forgot password</SendP>
					{isVisible && (
						<SendEmailForm sendMessage={sendMessageForgot} />
					)}
				</>
			)}
		</div>
	);
};
