import * as React from 'react';
import { FC } from 'react';
import { ChangePasswordForm } from '../forms/changePasswordForm/changePasswordForm';
import { FormContainer, FormH2 } from './changePassword.styles';

interface ChangePasswordProps {
	id: string;
}

export const ChangePassword: FC<ChangePasswordProps> = ({ id }) => {
	const [isVisible, setIsVisible] = React.useState(false);
	const toggleVisibility = () => {
		setIsVisible((prev) => !prev);
	};
	return (
		<div>
			<FormH2 onClick={toggleVisibility}>Change password</FormH2>
			{isVisible && (
				<FormContainer>
					<ChangePasswordForm id={id} />
				</FormContainer>
			)}
		</div>
	);
};
