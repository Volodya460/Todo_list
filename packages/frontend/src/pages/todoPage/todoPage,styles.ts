import styled from '@emotion/styled';
import { fontSize } from '~shared/styles';
export const Section = styled.section`
	padding: 50px 10px 20px 10px;
`;

export const TodoBox = styled.div`
	display: flex;
	align-items: start;
	justify-content: center;
	flex-direction: column;

	h2 {
		font-size: ${fontSize.larg};
		margin-bottom: 40px;
	}

	h3 {
		margin-bottom: 10px;
	}

	label {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		margin-bottom: 30px;
	}
`;
