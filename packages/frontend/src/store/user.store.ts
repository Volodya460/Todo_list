import { toast } from 'react-toastify';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import {
	forgotPassword,
	login,
	logout,
	refreshUser,
	register,
	resetPassword,
	sendVerifyMessage,
	updatePassword,
	updateUser,
} from '~/api/userApi';
import { LoginParams, RegisterParams, User, UserState } from '~typings/global';

export const useUserStore = create<UserState>()(
	persist(
		devtools(
			immer((set) => ({
				token: null,
				user: {
					id: null,
					username: null,
					email: null,
				},
				isLoading: false,
				isLoggedIn: false,
				isRefreshing: false,
				isRegister: false,
				changePassword: false,

				register: async (user: RegisterParams): Promise<void> => {
					set({ isLoading: true });
					try {
						const res = await register(user);

						set((state) => {
							state.isRegister = true;
							state.user = res.user;
						});
					} catch (error) {
						toast.error(error.message.message);
					} finally {
						set({ isLoading: false });
					}
				},
				login: async (user: LoginParams): Promise<void> => {
					set({ isLoading: true });
					try {
						const res = await login(user);

						set((state) => {
							state.token = res.token;
							state.user = res.user;
							state.isLoggedIn = true;
						});
					} catch (error) {
						toast.error(error.message.message);
					} finally {
						set({ isLoading: false });
					}
				},
				refreshUser: async (): Promise<void> => {
					set({ isRefreshing: true });
					try {
						const token = useUserStore.getState().token;

						if (!token) throw new Error('Unable to fetch user');

						const user = await refreshUser(token);
						set((state) => {
							state.user = user;
							state.isLoggedIn = true;
						});
					} catch (error) {
						set((state) => {
							state.token = null;
							state.user = {
								id: null,
								username: null,
								email: null,
							};
							state.isLoggedIn = false;
						});
					} finally {
						set({ isRefreshing: false });
					}
				},
				logout: async (): Promise<void> => {
					set({ isLoading: true });
					try {
						const res = await logout();

						set((state) => {
							state.token = null;
							state.changePassword = false;
							state.user = {
								id: null,
								username: null,
								email: null,
							};
							state.isLoggedIn = false;
							state.isRegister = false;
						});
					} catch (error) {
						toast.error(error.message.message);
					} finally {
						set({ isLoading: false });
					}
				},
				updateUser: async (newUser: User): Promise<void> => {
					set({ isLoading: true });
					try {
						const NewUser = await updateUser(newUser);
						set((state) => {
							state.user = newUser;
						});
						toast.success('User updated successfully');
					} catch (error) {
						toast.error(error.message.message);
						return undefined;
					} finally {
						set({ isLoading: false });
					}
				},
				updatePassword: async (
					id: string,
					oldPassword: string,
					newPassword: string,
				): Promise<void> => {
					set({ isLoading: true });
					try {
						await updatePassword(id, oldPassword, newPassword);

						toast.success('Password updated successfully');
					} catch (error) {
						toast.error(error.message.message);
						return undefined;
					} finally {
						set({ isLoading: false });
					}
				},
				sendVerifyMessage: async (email: string): Promise<void> => {
					set({ isLoading: true });
					try {
						await sendVerifyMessage(email);
						toast.success('Message sent successfully');
					} catch (error) {
						toast.error(error.message.message);
					} finally {
						set({ isLoading: false });
					}
				},
				forgotPassword: async (email: string): Promise<void> => {
					set({ isLoading: true });
					try {
						await forgotPassword(email);
						toast.success('Message sent successfully');
					} catch (error) {
						toast.error(error.message.message);
					} finally {
						set({ isLoading: false });
					}
				},
				resetPassword: async (password: string, token: string) => {
					set({ isLoading: true });
					try {
						await resetPassword(password, token);
						toast.success('Password successfully changed');
						set({ changePassword: true });
					} catch (error) {
						toast.error(error.message.message);
					} finally {
						set({ isLoading: false });
					}
				},
			})),
		),
		{
			name: 'userStore',
			version: 1,
			partialize: (state) => ({ token: state.token }),
		},
	),
);
