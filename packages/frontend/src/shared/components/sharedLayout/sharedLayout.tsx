import * as React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Button, ButtonDiv, Header, Nav } from './sharedLayout.styles';
import { Container } from '../container/container';

import { Modal } from '../modal/user/userInfo';
import { useUserStore } from '~store/user.store';
import Loader from '../loader/loader.component';

function SharedLayout(): React.ReactNode {
	const logout = useUserStore((state) => state.logout);
	const [openModalUpdate, setOpenModalUpdate] = React.useState(false);

	const openModal = () => {
		setOpenModalUpdate(true);
		document.body.style.overflow = 'hidden';
	};

	const closeModal = () => {
		setOpenModalUpdate(false);
		document.body.style.overflow = 'visible';
	};
	return (
		<>
			<Header>
				{' '}
				<Container>
					{' '}
					<Nav>
						<NavLink to="/todos">TodoList</NavLink>
						<ButtonDiv>
							{' '}
							<Button onClick={openModal}>My Profile</Button>
							<Button onClick={logout}>Logout</Button>
						</ButtonDiv>
					</Nav>
				</Container>
			</Header>

			<Suspense fallback={<Loader />}>
				<Outlet />
			</Suspense>
			{openModalUpdate ? <Modal closeModal={closeModal} /> : null}
		</>
	);
}

export default SharedLayout;
