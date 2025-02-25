import * as React from 'react';
import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { UpdateForm } from '~shared/components/forms/updateForm/updateForm';
import { ModalWindow, Overlay } from './userInfo.styles';
import { useUserStore } from '~store/user.store';
import { ChangePassword } from '~shared/components/changePassword/changePassword';

const modalRoot = document.querySelector('#modal-root');
interface ModalProps {
	closeModal: () => void;
}
export const Modal: FC<ModalProps> = ({ closeModal }) => {
	const user = useUserStore((state) => state.user);
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [closeModal]);

	const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.currentTarget === e.target) {
			closeModal();
		}
	};

	if (!modalRoot) return null;
	return createPortal(
		<div>
			<Overlay onClick={handleBackDropClick}>
				<ModalWindow>
					<UpdateForm
						name={user.username}
						email={user.email}
						id={user.id}
					/>
					<ChangePassword id={user.id} />
				</ModalWindow>
			</Overlay>
		</div>,
		modalRoot,
	);
};
