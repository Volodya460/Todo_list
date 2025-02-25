import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '~/formSchemas/resetPasswordSchema';
import { ResetPasswordParams } from '~typings/global';
import Button from '~shared/components/button/button.component';
import { DivError, Form } from './resetPasswordForm.styles';
import { useUserStore } from '~store/user.store';

export const ResetPasswordForm = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const resetPassword = useUserStore((state) => state.resetPassword);
	const changePassword = useUserStore((state) => state.changePassword);

	React.useEffect(() => {
		if (changePassword) {
			navigate('/login');
		}
	}, [changePassword]);

	const token = searchParams.get('token');
	const { register, handleSubmit, formState, reset } =
		useForm<ResetPasswordParams>({
			defaultValues: {
				password: '',
				confirmPassword: '',
			},
			resolver: zodResolver(resetPasswordSchema),
		});

	const { errors } = formState;
	const onSubmit = (e: ResetPasswordParams): void => {
		const { password } = e;

		resetPassword(password, token);
		reset();
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<label>
				<span>Password</span>

				<input
					{...register('password')}
					type="password"
					placeholder="Enter your password"
				/>
				<DivError>{errors.password?.message}</DivError>
			</label>
			<label>
				<span>Confirm password</span>

				<input
					{...register('confirmPassword')}
					type="password"
					placeholder="Repeat your password"
				/>
				<DivError>{errors.confirmPassword?.message}</DivError>
			</label>
			<Button type={'submit'} text={'Reset password'} />
		</Form>
	);
};
