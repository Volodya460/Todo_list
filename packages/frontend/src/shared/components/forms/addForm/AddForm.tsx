import React from 'react';
import Switch from '@mui/material/Switch';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Todo } from '~typings/global';
import { addSchema } from '~/formSchemas/addSchema';
import { useTodoStore } from '~store/todo.store';
import { Form, FormLabel } from './AddForm.styles';
import Button from '../../button/button.component';
import Loader from '~shared/components/loader/loader.component';

export const AddForm = (): JSX.Element => {
	const addTodo = useTodoStore((state) => state.addTodo);
	const isLoading = useTodoStore((state) => state.isLoading);
	const { control, register, handleSubmit, formState, reset } = useForm<Todo>(
		{
			defaultValues: {
				title: '',
				description: '',
				isPublic: false,
			},
			resolver: zodResolver(addSchema),
		},
	);

	const { errors } = formState;

	const onSubmit = (e: Todo): void => {
		const { title, description, isPublic } = e;

		const newTodo = { title, description, isPublic };
		addTodo(newTodo);
		reset({
			title: '',
			description: '',
			isPublic: false,
		});
	};
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormLabel>
				<span>Title</span>

				<input {...register('title')} placeholder="Title" />
				<div>{errors.title?.message}</div>
			</FormLabel>
			<FormLabel>
				<span>Description</span>
				<input {...register('description')} placeholder="Description" />
				<div>{errors.description?.message}</div>
			</FormLabel>
			<FormLabel>
				<span>Public :</span>
				<Controller
					name="isPublic"
					control={control}
					render={({ field }) => (
						<Switch
							checked={field.value}
							onChange={(event) =>
								field.onChange(event.target.checked)
							}
						/>
					)}
				/>
				<div>{errors.isPublic?.message}</div>
			</FormLabel>
			{isLoading ? (
				<Loader />
			) : (
				<Button type={'submit'} text={'Add Todo'} />
			)}
		</Form>
	);
};
