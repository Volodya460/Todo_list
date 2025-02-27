import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import ResetPasswordPage from '~/pages/resetPasswordPage/resetPasswordPage';
import { PrivateRoutes, PublicRoutes } from '~router/routes';
import { useUserStore } from '~store/user.store';

const HomePage = React.lazy(() => import('~/pages/homePage/homePage'));
const RegistePage = React.lazy(() => import('~/pages/registePage/registePage'));
const LoginPage = React.lazy(() => import('~/pages/loginPage/loginPage'));
const TodoListPage = React.lazy(
	() => import('~/pages/todoListPage/todoListPage'),
);
const TodoPage = React.lazy(() => import('~/pages/todoPage/todoPage'));
const SharedLayout = React.lazy(
	() => import('~shared/components/sharedLayout/sharedLayout'),
);

const App = (): React.ReactNode => {
	const refreshUser = useUserStore((state) => state.refreshUser);

	React.useEffect(() => {
		refreshUser();
	}, [refreshUser]);

	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route
					path="/"
					element={
						<PublicRoutes
							component={<HomePage />}
							redirectTo="/todos"
						/>
					}
				/>

				<Route
					path="/registe"
					element={
						<PublicRoutes
							component={<RegistePage />}
							redirectTo="/todos"
						/>
					}
				/>
				<Route
					path="/login"
					element={
						<PublicRoutes
							component={<LoginPage />}
							redirectTo="/todos"
						/>
					}
				/>

				<Route path="/" element={<SharedLayout />}>
					<Route
						path="todos"
						element={
							<PrivateRoutes
								component={<TodoListPage />}
								redirectTo="/"
							/>
						}
					/>
					<Route
						path="todo/:id"
						element={
							<PrivateRoutes
								component={<TodoPage />}
								redirectTo="/"
							/>
						}
					/>
				</Route>

				<Route
					path="/reset-password"
					element={<ResetPasswordPage />}
				></Route>
			</>,
		),
	);

	return (
		<>
			{' '}
			<RouterProvider router={router} />{' '}
			<ToastContainer position={'top-right'} style={{ zIndex: 5 }} />
		</>
	);
};

export default App;
