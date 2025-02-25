import styled from '@emotion/styled';
export const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
	border-radius: 15px;
	border: 2px solid black;
	box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
	gap: 20px;

	label {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;

		input {
			border: 2px solid black;
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

export const DivError = styled.div`
	position: absolute;
	color: red;
	text-align: center;
	top: 100%;
`;
