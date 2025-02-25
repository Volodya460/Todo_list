import React, { useEffect, useState } from 'react';

import { TodoElement } from '../todoElement/todoElement';
import { useTodoStore } from '~store/todo.store';
import { TodoList } from './todoContainer.styles';
import { SwiperTodos } from '../swiper/swiper';
import TodosTable from '../todosTable/todosTable';
import { FilterForm } from '../forms/filterForm/filterForm';
import Loader from '../loader/loader.component';

export const TodoContainer = (): JSX.Element => {
	const [showSwiper, setShowSwiper] = useState(false);
	const [showTablet, setShowTablet] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const todos = useTodoStore((state) => state.todos);

	const { search, status, isPublic } = useTodoStore();

	const getAllTodos = useTodoStore((state) => state.getAllTodos);

	useEffect(() => {
		const handleResize = (): void => {
			const isInRange = window.matchMedia(
				'(min-width: 768px) and (max-width: 1279px)',
			).matches;
			setShowSwiper(isInRange);
			const isInRangeTable = window.matchMedia(
				'(min-width: 1280px)',
			).matches;
			setShowTablet(isInRangeTable);
		};

		const fetchAndResize = async (): Promise<void> => {
			await getAllTodos();
			handleResize();
			setIsLoading(false);
		};

		fetchAndResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [getAllTodos, search, status, isPublic]);

	if (isLoading) {
		return <Loader />;
	}

	if (todos?.length === 0) {
		return (
			<>
				<FilterForm />
				<p>No todos available</p>
			</>
		);
	}
	if (showSwiper) {
		return (
			<>
				<FilterForm />
				<SwiperTodos todos={todos} />
			</>
		);
	}

	if (showTablet) {
		return (
			<>
				<FilterForm />
				<TodosTable todos={todos} />
			</>
		);
	}

	return (
		<>
			<FilterForm />
			<TodoList>
				{todos.map((el) => (
					<TodoElement
						key={el.id}
						id={el.id}
						title={el.title}
						description={el.description}
						completed={el.completed}
						isPublic={el.isPublic}
						ownerId={el.ownerId}
					/>
				))}
			</TodoList>
		</>
	);
};
