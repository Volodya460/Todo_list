import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';
import Button from '~shared/components/button/button.component';
import { Container } from '~shared/components/container/container';
import { useTodoStore } from '~store/todo.store';
import { Todo } from '~typings/global';
import { Section, TodoBox } from './todoPage,styles';
import { useUserStore } from '~store/user.store';
import { toast } from 'react-toastify';

export default function TodoPage(): JSX.Element {
	const { id } = useParams<{ id: string }>();
	const userId = useUserStore((state) => state.user?.id);
	const [todo, setTodo] = useState<Todo | null>(null);
	const updateTodo = useTodoStore((state) => state.updateTodo);
	const getTodoById = useTodoStore((state) => state.getTodoById);

	const location = useLocation();
	const navigate = useNavigate();

	const isOwner = todo?.ownerId === userId;

	const changeDescription = (key: keyof Todo, value: boolean): void => {
		if (!todo || !isOwner) return;
		if (!todo) return;
		const { title, description, completed, isPublic } = todo;
		const updatedTodo = {
			title,
			description,
			completed,
			isPublic,
			[key]: value,
		};
		updateTodo(parseInt(id!), updatedTodo);
		setTodo({ ...updatedTodo, ownerId: todo.ownerId });
	};

	useEffect(() => {
		const fetchTodo = async (): Promise<void> => {
			try {
				const fetchedTodo = await getTodoById(parseInt(id!));
				setTodo(fetchedTodo);
			} catch (error) {
				toast.error('Failed to fetch todo:', error);
				setTodo(null);
			}
		};

		if (id) {
			fetchTodo();
		}
	}, [id, getTodoById]);

	if (!todo) {
		return <p>Loading...</p>;
	}

	return (
		<Container>
			<Section>
				{' '}
				<TodoBox>
					<h2>{todo.title}</h2>
					<h3>Description</h3>
					<p>{todo.description}</p>
					<label>
						<span>Completed</span>
						<Switch
							checked={todo.completed}
							onChange={() =>
								changeDescription('completed', !todo.completed)
							}
							disabled={!isOwner}
						/>
					</label>
					<label>
						<span>Public</span>
						<Switch
							checked={todo.isPublic}
							onChange={() =>
								changeDescription('isPublic', !todo.isPublic)
							}
							disabled={!isOwner}
						/>
					</label>
				</TodoBox>
				<Button
					text={'Back'}
					onClick={() => {
						navigate(location?.state?.from ?? '/todos');
					}}
				/>
			</Section>
		</Container>
	);
}
