import styled from '@emotion/styled';

import { colors } from '../../styles';

export const Header = styled.header`
	display: flex;
	align-items: center;

	padding: 5px 10px 5px 10px;
	border-bottom: 1px solid black;
	nav {
		display: flex;
		width: 300px;
		align-items: center;
		justify-content: space-between;

		@media screen and (min-width: 480px) {
			width: 100%;
		}
	}
`;

export const Button = styled.button`
	color: ${colors.dimGray};
	background-color: ${colors.white};

	color: ${colors.black};
	background-color: ${colors.white};
	border: 3px solid ${colors.black};
	border-radius: 12px;
	padding: 5px 10px;
	cursor: pointer;
	box-shadow: 2px 2px 0 ${colors.black};
	transition:
		transform 0.2s,
		box-shadow 0.2s;

	&:hover,
	&:focus {
		background-color: #f2f2f2;
		box-shadow: 7px 7px 0 #000;
	}
`;

export const ButtonDiv = styled.div`
	display: flex;W
	align-items: center;
	justify-content: center;
	gap: 10px;
`;

export const Nav = styled.nav`
	a {
		color: ${colors.dimGray};
		background-color: ${colors.white};
		border: 3px solid ${colors.black};
		border-radius: 12px;
		padding: 5px 10px;
		cursor: pointer;
		box-shadow: 2px 2px 0 ${colors.black};
		transition:
			transform 0.2s,
			box-shadow 0.2s;

		&:hover,
		&:focus {
			background-color: #f2f2f2;
			box-shadow: 7px 7px 0 #000;
		}
	}
`;
