import axios from 'axios';
import { handleAxiosError } from '~/helpers/handleAxiosError';
import { Todo } from '~typings/global';
const BaseURL = process.env.NEXT_PUBLIC_API_URL;
console.log(BaseURL);
export async function getTodos(
	search?: string,
	status?: 'completed' | 'pending',
	isPublic?: boolean,
): Promise<Todo[] | undefined> {
	try {
		const params: Record<string, string> = {};
		if (search) params.search = search;
		if (status) params.status = status;
		if (isPublic !== undefined) params.public = String(isPublic);
		const { data } = await axios.get(`${BaseURL}/todos/all`, { params });
		return data;
	} catch (error) {
		throw handleAxiosError(error);
	}
}

export async function addTodo(todo: Todo): Promise<Todo> {
	try {
		const { data } = await axios.post(`${BaseURL}/todos`, todo);
		return data;
	} catch (error) {
		throw handleAxiosError(error);
	}
}

export async function deleteTodo(id: number): Promise<void> {
	try {
		await axios.delete(`${BaseURL}/todos/${id}`);
	} catch (error) {
		throw handleAxiosError(error);
	}
}

export async function updateTodo(id: number, newTodo: Todo): Promise<void> {
	try {
		await axios.put(`${BaseURL}/todos/${id}`, newTodo);
	} catch (error) {
		throw handleAxiosError(error);
	}
}

export async function getTodoById(id: number): Promise<Todo | undefined> {
	try {
		const { data } = await axios.get(`${BaseURL}/todos/${id}`);
		return data;
	} catch (error) {
		throw handleAxiosError(error);
	}
}
