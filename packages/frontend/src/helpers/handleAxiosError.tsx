import axios, { AxiosError } from 'axios';
import { CustomError } from '~typings/global';
export function handleAxiosError(error: unknown): CustomError {
	if (axios.isAxiosError(error)) {
		const axiosError = error as AxiosError;
		const status = axiosError.response?.status || 500;
		const message =
			axiosError.response?.data || 'An unexpected error occurred';
		return { status, message } as CustomError;
	} else {
		return {
			status: 500,
			message: 'An unexpected error occurred',
		} as CustomError;
	}
}
