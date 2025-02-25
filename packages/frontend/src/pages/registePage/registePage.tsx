import * as React from 'react';
import { Section } from './registePage.styles';
import { RegisteForm } from '~shared/components/forms/registeForm/registForm';
import Button from '~shared/components/button/button.component';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '~store/user.store';

export default function RegistePage(): React.ReactNode {
	const isRegister = useUserStore((state) => state.isRegister);

	const location = useLocation();
	const navigate = useNavigate();

	React.useEffect(() => {
		if (isRegister) {
			navigate('/login', { state: { from: location.pathname } });
		}
	}, [isRegister, navigate]);
	return (
		<Section>
			<Button
				text={'Back'}
				onClick={() => {
					navigate(location?.state?.from ?? '/');
				}}
			/>
			<RegisteForm />
		</Section>
	);
}
