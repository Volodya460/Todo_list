import express, { Express, Request, Response, NextFunction } from 'express';

import passport from 'passport';
import cors from 'cors';
import 'dotenv/config';
import AppRouter from './routes';
import { initializePassport } from 'passport-config';
import HttpError from './helpers/httpErrors';

const port = 3000;
const app: Express = express();

initializePassport(passport);
app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = new AppRouter(app);
router.init();

app.use((req: Request, res: Response, next: NextFunction) => {
	next(new HttpError(404, `Cannot ${req.method} ${req.originalUrl}`));
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
	const status = err.status || 500;
	const message = err.message || 'Internal Server Error';
	console.log(err.message);
	res.status(status).json({ message });
});

app.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});
