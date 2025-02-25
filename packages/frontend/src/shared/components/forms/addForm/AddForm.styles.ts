import styled from '@emotion/styled';
import { colors } from '~shared/styles';

export const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 20px;
	margin-bottom: 30px;
`;
export const FormLabel = styled.label`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: start;
	input {
		border: 1px solid ${colors.black};
		border-radius: 5px;
		padding: 5px;
	}
	div {
		position: absolute;
		top: 0;
		left: 0;

		color: red;
	}
`;
