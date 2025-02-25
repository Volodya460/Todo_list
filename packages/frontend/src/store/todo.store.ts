import { toast } from 'react-toastify';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import {
	getTodos,
	addTodo,
	deleteTodo,
	updateTodo,
	getTodoById,
} from '~/api/todoApi';

import { TodoState, Todo } from '~typings/global';

export const useTodoStore = create<TodoState>()(
	devtools(
		immer((set, get) => ({
			todos: [],
			isLoading: false,
			search: '',
			status: undefined,
			isPublic: false,
			getAllTodos: async (): Promise<void> => {
				set({ isLoading: true });
				try {
					const { search, status, isPublic } = get();
					const todos = await getTodos(search, status, isPublic);
					set((state) => {
						state.todos = todos || [];
					});
				} catch (error) {
					toast.error(error.message.message);
				} finally {
					set({ isLoading: false });
				}
			},
			addTodo: async (todo: Todo): Promise<void> => {
				set({ isLoading: true });
				try {
					const newTodo = await addTodo(todo);
					set((state) => {
						state.todos.push(newTodo);
					});
				} catch (error) {
					toast.error(error.message.message);
				} finally {
					set({ isLoading: false });
				}
			},
			removeTodo: async (id: number): Promise<void> => {
				try {
					await deleteTodo(id);
					set((state) => {
						state.todos = state.todos.filter(
							(todo) => todo.id !== id,
						);
					});
					toast.success('Delete sucessfully completed');
				} catch (error) {
					toast.error(error.message.message);
				}
			},
			updateTodo: async (id: number, newTodo: Todo): Promise<void> => {
				try {
					const todo = useTodoStore
						.getState()
						.todos.find((el) => el.id === id);
					if (todo) {
						await updateTodo(id, newTodo);
						set((state) => {
							state.todos = state.todos.map((todo) =>
								todo.id === id ? { ...todo, ...newTodo } : todo,
							);
						});
					}
				} catch (error) {
					toast.error(error.message.message);
				}
			},
			getTodoById: async (id: number): Promise<Todo | undefined> => {
				set({ isLoading: true });
				try {
					const todo = await getTodoById(id);
					return todo;
				} catch (error) {
					toast.error(error.message.message);
					return undefined;
				} finally {
					set({ isLoading: false });
				}
			},
			setSearch: (search: string) => set({ search }),
			setStatus: (status: 'completed' | 'pending' | undefined) =>
				set({ status }),
			setIsPublic: () =>
				set((state) => {
					state.isPublic = false;
				}),
			toggleIsPublic: () => {
				set((state) => {
					state.isPublic = !state.isPublic;
				});
			},
		})),
	),
);
