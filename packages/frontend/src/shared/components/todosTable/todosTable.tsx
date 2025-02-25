import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '../button/button.component';
import { Switch } from '@mui/material';
import { useTodoStore } from '~store/todo.store';
import { NavLink } from 'react-router-dom';
import { useUserStore } from '~store/user.store';

export default function TodosTable({ todos }): JSX.Element {
	const removeTodo = useTodoStore((state) => state.removeTodo);
	const updateTodo = useTodoStore((state) => state.updateTodo);
	const userId = useUserStore((state) => state.user?.id);

	const columns: GridColDef[] = [
		{ field: 'title', headerName: 'Title', width: 200 },
		{ field: 'description', headerName: 'Description', width: 500 },
		{
			field: 'actions',
			headerName: 'Actions',
			width: 250,
			sortable: false,
			renderCell: (params) => {
				const isOwner = params.row.ownerId === userId;
				return (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '10px',
						}}
					>
						<NavLink to={`/todo/${params.row.id}`}>
							<Button text={'View'} />
						</NavLink>

						<Button
							text={'Delete'}
							onClick={() => removeTodo(params.row.id)}
						/>
					</div>
				);
			},
		},
		{
			field: 'completed',
			headerName: 'Completed',
			width: 150,
			renderCell: (params) => {
				const isOwner = params.row.ownerId === userId;
				return (
					<Switch
						checked={!!params.row.completed}
						onChange={() => {
							if (!isOwner) return;
							const {
								id,
								title,
								description,
								completed,
								isPublic,
							} = params.row;
							const newTodo = {
								title,
								description,
								completed: !completed,
								isPublic,
							};
							updateTodo(id, newTodo);
						}}
						disabled={!isOwner}
					/>
				);
			},
		},
		{
			field: 'isPublic',
			headerName: 'Public',
			width: 150,
			renderCell: (params) => {
				const isOwner = params.row.ownerId === userId;
				return (
					<Switch
						checked={!!params.row.isPublic}
						onChange={() => {
							if (!isOwner) return;
							const {
								id,
								title,
								description,
								completed,
								isPublic,
							} = params.row;
							const newTodo = {
								title,
								description,
								completed,
								isPublic: !isPublic,
							};
							updateTodo(id, newTodo);
						}}
						disabled={!isOwner}
					/>
				);
			},
		},
	];

	return (
		<Paper sx={{ height: 500, width: '100%' }}>
			<DataGrid
				rows={todos}
				columns={columns}
				processRowUpdate={(newRow) => {
					console.log('Updated row:', newRow);
					return newRow;
				}}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				pageSizeOptions={[5, 10]}
				sx={{ border: 1 }}
			/>
		</Paper>
	);
}
