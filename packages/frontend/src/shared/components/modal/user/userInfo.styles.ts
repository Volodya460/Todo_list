import styled from '@emotion/styled';

export const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;

	width: 100vw;
	height: 100vh;

	z-index: 3;
	background-color: rgba(23, 61, 51, 0.25);
	backdrop-filter: blur(2px);
`;

export const ModalWindow = styled.div`
	position: absolute;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	z-index: 4;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 300px;
	height: 450px;

	padding: 40px;
	color: white;

	backdrop-filter: blur(25px);
	background: rgba(23, 61, 51, 0.75);

	border-radius: 25px;

	@media screen and (min-width: 768px) {
		width: 500px;
		height: 500px;
	}
`;
