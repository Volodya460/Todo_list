import styled from '@emotion/styled';

export const FilterInput = styled.input`
	border: 1px solid black;
	border-radius: 5px;
	padding: 5px;
`;

export const FilterBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 10px;
	margin-bottom: 15px;
`;

export const FilterButtonBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;

	button {
		width: 80px;
		padding: 5px;
		cursor: pointer;
		border-radius: 12px;
		box-shadow: 2px 2px 0 black;

		transition:
			transform 0.2s,
			box-shadow 0.2s;

		&:hover,
		&:focus {
			background-color: #f2f2f2;
			box-shadow: 7px 7px 0 #000;
		}
	}
	.active {
		border-color: #007bff;
		color: #007bff;
	}
`;
