import React from 'react';
import { AddForm } from '~shared/components/forms/addForm/AddForm';
import { ContainerDiv } from '~shared/components/container/container.styles';
import { TodoContainer } from '~shared/components/todoContainer/todoContainer';
import { Section } from './todoListPage.styles';

export default function TodoListPage(): JSX.Element {
	return (
		<ContainerDiv>
			<Section>
				<AddForm />
				<TodoContainer />
			</Section>
		</ContainerDiv>
	);
}
