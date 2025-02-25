import * as React from 'react';
import Button from '~shared/components/button/button.component';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendEmailParams } from '~typings/global';
import { sendEmailSchema } from '~/formSchemas/sendEmailSchema';
import { DivError, Form } from './sendEmailForm.styles';

interface SendEmailFormProps {
	sendMessage: (email: string) => void;
}
export const SendEmailForm: React.FC<SendEmailFormProps> = ({
	sendMessage,
}) => {
	const { register, handleSubmit, formState, reset } =
		useForm<SendEmailParams>({
			defaultValues: {
				email: '',
			},
			resolver: zodResolver(sendEmailSchema),
		});

	const { errors } = formState;

	const onSubmit = (e: SendEmailParams): void => {
		const { email } = e;

		sendMessage(email);
		reset({
			email: '',
		});
	};
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<label>
				<span>Email</span>
				<input
					type="email"
					{...register('email')}
					placeholder="email"
				/>
				<DivError>{errors.email?.message}</DivError>
			</label>

			<Button type={'submit'} text={'Send'} />
		</Form>
	);
};
