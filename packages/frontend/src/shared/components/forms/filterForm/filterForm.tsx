import React from 'react';
import { useTodoStore } from '~store/todo.store';
import { FilterBox, FilterButtonBox, FilterInput } from './filterForm.styles';

export const FilterForm = (): JSX.Element => {
	const {
		setSearch,
		getAllTodos,
		setStatus,
		toggleIsPublic,
		setIsPublic,
		isPublic,
	} = useTodoStore();

	const setAll = () => {
		setStatus(undefined);
		setIsPublic();
	};
	return (
		<FilterBox>
			<FilterInput
				type="text"
				placeholder="Search todos..."
				onChange={(e) => {
					setSearch(e.target.value);
					getAllTodos();
				}}
			/>
			<FilterButtonBox>
				<button onClick={() => setAll()}>All</button>
				<button onClick={() => setStatus('completed')}>
					Completed
				</button>
				<button onClick={() => setStatus('pending')}>Pending</button>
				<button
					className={isPublic ? 'active' : ''}
					onClick={() => toggleIsPublic()}
				>
					Public
				</button>
			</FilterButtonBox>
		</FilterBox>
	);
};
