import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { updateSchema } from '~/formSchemas/updateSchema';
import { RegisterParams } from '~typings/global';
import { DivError, Form, UserList } from './updateForm.styles';
import Button from '~shared/components/button/button.component';
import { useUserStore } from '~store/user.store';

interface UpdateFormProps {
	id: string;
	name: string;
	email: string;
}

export const UpdateForm: FC<UpdateFormProps> = ({ name, email, id }) => {
	const updateUser = useUserStore((state) => state.updateUser);
	const onSubmit = (e: RegisterParams) => {
		const { username, email } = e;

		let newUser = {
			id,
			username,
			email,
		};
		updateUser(newUser);
		document.body.style.overflow = 'visible';
	};

	const { register, handleSubmit, formState, watch } = useForm({
		defaultValues: {
			username: name,
			email: email,
		},
		resolver: zodResolver(updateSchema),
	});

	const { errors } = formState;
	const emailInput = watch('email');
	const nameInput = watch('username');

	return (
		<div>
			{' '}
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

				<Button type={'submit'} text={'Change'} />
			</Form>
			<UserList>
				<li>name: {nameInput}</li>
				<li>email: {emailInput}</li>
			</UserList>
		</div>
	);
};
