import styled from '@emotion/styled';

export const FormH2 = styled.h2`
	cursor: pointer;
	margin: 0;
	font-size: 20px;
	color: #ffffff;
	transition: color 0.3s ease;

	&:hover {
		color: #007bff;
	}
`;

export const FormContainer = styled.div`
	margin-top: 10px;
	padding: 5px;
	border: 1px solid black;
	border-radius: 5px;
	background-color: rgba(23, 61, 51, 0.75);
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Лёгкая тень */
	transition: all 0.3s ease;
`;
