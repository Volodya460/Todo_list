import { css } from '@emotion/css';
import { colors } from '../../styles';

export const btnStyles = (disabled: boolean): string => {
	return css`
		color: ${disabled ? colors.imperial : colors.dimGray};
		background-color: ${disabled ? colors.americanPurple : colors.white};

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
	`;
};

export const btnContentWrapper = css`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const iconWrapper = css`
	display: flex;
	align-items: center;
`;

export const mr = css`
	margin-right: 15px;
`;
