import styled from '@emotion/styled';
import { colors } from '../../styles';

export const DivButton = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 5px;

	button {
		color: ${colors.black};
		background-color: ${colors.white};
		border: 3px solid ${colors.black};
		border-radius: 12px;
		padding: 10px 20px;
		cursor: pointer;
		box-shadow: 5px 5px 0 ${colors.black};
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
