import axios, { AxiosError } from 'axios';
import {
	CustomError,
	LoginParams,
	RegisterParams,
	User,
	UserRessponse,
} from '~typings/global';
const BaseURL = 'https://todo-list-byfp.onrender.com/api';
console.log(BaseURL);
const setAuthHeader = (token: string) => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
	axios.defaults.headers.common.Authorization = '';
};

export async function register(
	user: RegisterParams,
): Promise<UserRessponse | undefined> {
	try {
		const { data } = await axios.post(`${BaseURL}/user/register`, user);
		setAuthHeader(data.token);
		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			const status = axiosError.response?.status || 500;
			const message =
				axiosError.response.data || 'An unexpected error occurred';
			throw { status, message } as CustomError;
		} else {
			throw {
				status: 500,
				message: 'An unexpected error occurred',
			} as CustomError;
		}
	}
}

export async function login(
	user: LoginParams,
): Promise<UserRessponse | undefined> {
	try {
		const { data } = await axios.post(`${BaseURL}/user/login`, user);
		setAuthHeader(data.token);
		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			const status = axiosError.response?.status || 500;
			const message =
				axiosError.response.data || 'An unexpected error occurred';
			throw { status, message } as CustomError;
		} else {
			throw {
				status: 500,
				message: 'An unexpected error occurred',
			} as CustomError;
		}
	}
}

export async function refreshUser(token: string): Promise<User> {
	try {
		setAuthHeader(token);
		const res = await axios.get(`${BaseURL}/user/current`);

		return res.data.user;
	} catch (error) {
		throw new Error('Failed to refresh user');
	}
}

export async function logout(): Promise<void> {
	try {
		await axios.post(`${BaseURL}/user/logout`);

		clearAuthHeader();
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			const status = axiosError.response?.status || 500;
			const message =
				axiosError.response.data || 'An unexpected error occurred';
			throw { status, message } as CustomError;
		} else {
			throw {
				status: 500,
				message: 'An unexpected error occurred',
			} as CustomError;
		}
	}
}

export async function updateUser(newUser: User): Promise<User> {
	try {
		const { data } = await axios.put(
			`${BaseURL}/user/${newUser.id}`,
			newUser,
		);
		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			const status = axiosError.response?.status || 500;
			const message =
				axiosError.response.data || 'An unexpected error occurred';
			throw { status, message } as CustomError;
		} else {
			throw {
				status: 500,
				message: 'An unexpected error occurred',
			} as CustomError;
		}
	}
}

export async function updatePassword(
	id: string,
	oldPassword: string,
	newPassword: string,
): Promise<void> {
	const passwords = {
		oldPassword,
		newPassword,
	};
	try {
		await axios.patch(`${BaseURL}/user/password/${id}`, passwords);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			const status = axiosError.response?.status || 500;
			const message =
				axiosError.response.data || 'An unexpected error occurred';
			throw { status, message } as CustomError;
		} else {
			throw {
				status: 500,
				message: 'An unexpected error occurred',
			} as CustomError;
		}
	}
}

export async function sendVerifyMessage(email: string): Promise<void> {
	try {
		await axios.post(`${BaseURL}/user/verify`, { email });
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			const status = axiosError.response?.status || 500;
			const message =
				axiosError.response.data || 'An unexpected error occurred';
			throw { status, message } as CustomError;
		} else {
			throw {
				status: 500,
				message: 'An unexpected error occurred',
			} as CustomError;
		}
	}
}

export async function forgotPassword(email: string): Promise<void> {
	try {
		await axios.post(`${BaseURL}/user/forgot-password`, { email });
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			const status = axiosError.response?.status || 500;
			const message =
				axiosError.response.data || 'An unexpected error occurred';
			throw { status, message } as CustomError;
		} else {
			throw {
				status: 500,
				message: 'An unexpected error occurred',
			} as CustomError;
		}
	}
}

export async function resetPassword(
	password: string,
	token: string,
): Promise<void> {
	try {
		await axios.post(`${BaseURL}/user/reset-password`, { password, token });
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			const status = axiosError.response?.status || 500;
			const message =
				axiosError.response.data || 'An unexpected error occurred';
			throw { status, message } as CustomError;
		} else {
			throw {
				status: 500,
				message: 'An unexpected error occurred',
			} as CustomError;
		}
	}
}
