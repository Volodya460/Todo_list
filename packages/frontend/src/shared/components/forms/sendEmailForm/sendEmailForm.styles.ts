import styled from '@emotion/styled';

export const DivError = styled.div`
	position: absolute;
	color: red;
	text-align: center;
	top: 100%;
`;

export const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;

	label {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;

		input {
			border: 1px solid black;

			padding: 5px;
			border-radius: 5px;
			box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
			transition: box-shadow 0.3s ease;

			&:focus {
				outline: none;
				box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
			}
		}
	}
`;
