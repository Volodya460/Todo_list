import sgMail, { ResponseError } from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface SendMailData {
	to: string;
	subject: string;
	html: string;
}

export const sendMail = async (data: SendMailData): Promise<boolean> => {
	try {
		const email = { ...data, from: 'infernokgg@gmail.com' };

		await sgMail.send(email);

		return true;
	} catch (error) {
		if (error instanceof ResponseError) {
			console.error('SendGrid error:', error);
		} else {
			console.error('Unexpected error:', error);
		}

		throw new Error('Failed to send email');
	}
};
