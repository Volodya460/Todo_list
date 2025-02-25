import * as React from 'react';
import { FC } from 'react';
import Button from '~shared/components/button/button.component';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema } from '~/formSchemas/changePasswordSchema';
import { ChangePassword } from '~typings/global';
import { DivError, Form } from './changePasswordForm.styles';
import { useUserStore } from '~store/user.store';

interface ChangePasswordFormProps {
	id: string;
}
export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({ id }) => {
	const updatePassword = useUserStore((state) => state.updatePassword);
	const { register, handleSubmit, formState, reset } =
		useForm<ChangePassword>({
			defaultValues: {
				oldPassword: '',
				newPassword: '',
			},
			resolver: zodResolver(changePasswordSchema),
		});

	const { errors } = formState;

	const onSubmit = (e: ChangePassword): void => {
		const { oldPassword, newPassword } = e;
		console.log(oldPassword);
		console.log(newPassword);
		updatePassword(id, oldPassword, newPassword);
		reset({
			oldPassword: '',
			newPassword: '',
		});
	};
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<label>
				<span>Old password</span>
				<input
					type="password"
					{...register('oldPassword')}
					placeholder="Old password"
				/>
				<DivError>{errors.oldPassword?.message}</DivError>
			</label>
			<label>
				<span>New password</span>
				<input
					type="password"
					{...register('newPassword')}
					placeholder="New password"
				/>
				<DivError>{errors.newPassword?.message}</DivError>
			</label>
			<Button type={'submit'} text={'Change'} />
		</Form>
	);
};
