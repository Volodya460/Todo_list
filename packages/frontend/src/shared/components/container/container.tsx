import React from 'react';
import { FC, ReactNode } from 'react';
import { ContainerDiv } from './container.styles';

interface ContainerProps {
	children: ReactNode;
}
export const Container: FC<ContainerProps> = ({ children }) => {
	return <ContainerDiv>{children}</ContainerDiv>;
};
