import styled from '@emotion/styled';
import { colors } from '~shared/styles';

export const TodoCard = styled.li`
	display: flex;
	align-items: start;
	justify-content: center;
	flex-direction: column;
	padding: 10px;
	width: 330px;
	gap: 15px;

	background-color: ${colors.dimGray};
	border: 3px solid ${colors.black};
	border-radius: 12px;
	@media screen and (min-width: 768px) {
		margin-left: auto;
		margin-right: auto;
	}
	div {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
`;

export const ToggleBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-left: 15px;
`;
