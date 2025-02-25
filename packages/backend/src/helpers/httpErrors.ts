class HttpError extends Error {
	public status: number;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;

		return Object.setPrototypeOf(this, HttpError.prototype);
	}
}

export default HttpError;
