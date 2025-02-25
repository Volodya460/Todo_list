import React, { FC } from 'react';
import { useTodoStore } from '~store/todo.store';
import Switch from '@mui/material/Switch';
import { Todo } from '~typings/global';
import { TodoCard, ToggleBox } from './todoElement.styles';
import Button from '../button/button.component';
import { NavLink } from 'react-router-dom';
import { useUserStore } from '~store/user.store';

export const TodoElement: FC<Todo> = ({
	id,
	title,
	description,
	completed,
	isPublic,
	ownerId,
}) => {
	const removeTodo = useTodoStore((state) => state.removeTodo);
	const updateTodo = useTodoStore((state) => state.updateTodo);
	const userId = useUserStore((state) => state.user?.id);
	const isOwner = ownerId === userId;
	const changeDescription = (key: keyof Todo, value: boolean): void => {
		const newTodo = {
			title,
			description,
			completed,
			isPublic,
			[key]: value,
		};

		updateTodo(id, newTodo);
	};
	return (
		<TodoCard key={id}>
			<h2>{title}</h2>
			<p>{description}</p>
			<div>
				{' '}
				<NavLink to={`/todo/${id}`}>
					<Button text={'View'} />
				</NavLink>
				<Button onClick={() => removeTodo(id)} text={'Delet'} />
				<ToggleBox>
					{' '}
					<label>
						Complete
						<Switch
							checked={completed}
							onChange={() =>
								changeDescription('completed', !completed)
							}
							disabled={!isOwner}
						/>
					</label>
					<label>
						Public
						<Switch
							checked={isPublic}
							onChange={() =>
								changeDescription('isPublic', !isPublic)
							}
							disabled={!isOwner}
						/>
					</label>
				</ToggleBox>
			</div>
		</TodoCard>
	);
};
