import sgMail, { ResponseError } from '@sendgrid/mail';

import * as brevo from '@getbrevo/brevo';

const apiKey = process.env.BREVO_API_KEY;

if (!apiKey) {
	throw new Error('BREVO_API_KEY is not set');
}
const senderEmail = process.env.BREVO_SENDER_EMAIL!;
const senderName = process.env.BREVO_SENDER_NAME || 'App';

const client = new brevo.TransactionalEmailsApi();
client.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

export type SendMailOptions = {
	to: string;
	subject: string;
	html: string;
};

export async function sendMail(opts: SendMailOptions): Promise<void> {
	console.log(opts);
	const { to, subject, html } = opts;
	await client.sendTransacEmail({
		sender: { email: senderEmail, name: senderName },
		to: [{ email: to }],
		subject,
		htmlContent: html,
	});
}
