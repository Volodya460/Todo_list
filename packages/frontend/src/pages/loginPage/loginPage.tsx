import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginForm } from '~shared/components/forms/loginForm/loginForm';
import { Section } from './loginPage.styles';
import Button from '~shared/components/button/button.component';
export default function LoginPage(): React.ReactNode {
	const location = useLocation();
	const navigate = useNavigate();
	return (
		<Section>
			<Button
				text={'Back'}
				onClick={() => {
					navigate(location?.state?.from ?? '/');
				}}
			/>

			<LoginForm />
		</Section>
	);
}
