import * as React from 'react';
import { useForm } from 'react-hook-form';
import { RegisterParams } from '~typings/global';
import { zodResolver } from '@hookform/resolvers/zod';
import { registeSchema } from '~/formSchemas/registerSchema';
import { useUserStore } from '~store/user.store';
import { DivError, Form, RegH1 } from './registForm.styles';
import Button from '~shared/components/button/button.component';
import Loader from '~shared/components/loader/loader.component';

export const RegisteForm = () => {
	const registe = useUserStore((state) => state.register);
	const isLoading = useUserStore((state) => state.isLoading);
	const { register, handleSubmit, formState, reset } =
		useForm<RegisterParams>({
			defaultValues: {
				username: '',
				email: '',
				password: '',
			},
			resolver: zodResolver(registeSchema),
		});
	const { errors } = formState;
	const onSubmit = (e: RegisterParams): void => {
		const { username, email, password } = e;
		const user = { username, email, password };
		registe(user);
		reset({
			username: '',
			email: '',
			password: '',
		});
	};

	return (
		<div>
			<RegH1>Registration</RegH1>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<label>
					<span>Name</span>

					<input
						{...register('username')}
						type="text"
						placeholder="Enter your name"
					/>
					<DivError>{errors.username?.message}</DivError>
				</label>
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
					<Button type={'submit'} text={'Sign up'} />
				)}
			</Form>
		</div>
	);
};
