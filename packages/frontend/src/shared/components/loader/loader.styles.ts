import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const animLoader = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

export const LoaderDiv = styled.div`
	font-size: 24px;
	display: inline-block;
	margin-left: auto;
	margin-right: auto;
	font-weight: bold;
	color: #263238;
	box-sizing: border-box;
	text-shadow:
		0 0 2px #fff,
		0 0 1px #fff,
		0 0 1px #fff;
	letter-spacing: 2px;
	position: relative;

	&::after {
		content: 'Loading';
		position: absolute;
		left: 0;
		top: 0;
		color: #fff;
		width: 100%;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
		animation: ${animLoader} 2s linear infinite;
	}
`;
