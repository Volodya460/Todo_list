import * as React from 'react';

import { Container } from '~shared/components/container/container';
import Button from '~shared/components/button/button.component';
import { useNavigate } from 'react-router-dom';
import { Section } from './homePage.styles';
import { ButtunBox } from '../loginPage/loginPage.styles';

export default function HomePage(): React.ReactNode {
	const navigate = useNavigate();
	return (
		<Container>
			<Section>
				{' '}
				<ButtunBox>
					<li>
						<Button
							text={'Register'}
							onClick={() => {
								navigate('/registe');
							}}
						/>
					</li>
					<li>
						<Button
							text={'Login'}
							onClick={() => {
								navigate('/login');
							}}
						/>
					</li>
				</ButtunBox>
			</Section>
		</Container>
	);
}
