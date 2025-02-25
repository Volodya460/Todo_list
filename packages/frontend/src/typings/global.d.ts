declare module '*.svg' {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	export default content;
}

export interface Todo {
	id?: number;
	title: string;
	description: string;
	completed?: boolean;
	isPublic?: boolean;
	ownerId?: string;
}

export interface TodoState {
	todos: Todo[];
	isLoading: boolean;
	search: string;
	status: 'completed' | 'pending' | undefined;
	isPublic: boolean;
	getAllTodos: () => void;
	addTodo: (todo: Todo) => void;
	removeTodo: (id: number) => void;
	updateTodo: (id: number, Todo: Todo) => void;
	getTodoById: (id: number) => Promise<Todo | undefined>;
	setSearch: (search: string) => void;
	setStatus: (status: 'completed' | 'pending' | undefined) => void;
	setIsPublic: () => void;
	toggleIsPublic: () => void;
}

export interface CustomError extends Error {
	status: number;
	message: string;
}

export interface User {
	id: string;
	username: string;
	email: string;
}

export type UpdateUser = Omit<User, 'id'>;

export interface UserRessponse {
	token: string;
	user: User;
}
export interface ChangePassword {
	oldPassword: string;
	newPassword: string;
}

export interface RegisterParams {
	username: string;
	email: string;
	password: string;
}

export type SendEmailParams = Pick<RegisterParams, 'email'>;

export type LoginParams = Omit<RegisterParams, 'username'>;

export interface ResetPasswordParams {
	password: string;
	confirmPassword: string;
}

export interface UserState {
	token: string;
	user: User;
	isLoading: boolean;
	isLoggedIn: boolean;
	isRefreshing: boolean;
	isRegister: boolean;
	changePassword: boolean;
	register: (user: RegisterParams) => void;
	login: (user: LoginParams) => void;
	refreshUser: () => void;
	logout: () => void;
	updateUser: (newUser: User) => void;
	updatePassword: (
		id: string,
		oldPassword: string,
		newPassword: string,
	) => void;
	sendVerifyMessage: (email: string) => void;
	forgotPassword: (email: string) => void;
	resetPassword: (password: string, token: string) => void;
}
