import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { FC, ReactNode } from 'react';
import { useUserStore } from '~store/user.store';
interface privateRoutesProps {
	component: ReactNode;
	redirectTo: string;
}

export const PrivateRoutes: FC<privateRoutesProps> = ({
	component: Component,
	redirectTo = '/',
}) => {
	const isLoggedIn = useUserStore((state) => state.isLoggedIn);
	const isRefreshing = useUserStore((state) => state.isRefreshing);
	const shouldRedirect = !isLoggedIn && !isRefreshing;

	return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};

export const PublicRoutes = ({ component: Component, redirectTo = '/' }) => {
	const isLoggedIn = useUserStore((state) => state.isLoggedIn);

	return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
