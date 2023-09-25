import express from 'express';
import cookieParser from "cookie-parser";
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import logger from 'morgan';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import { mainRouter } from './routes/index-router';
import { errorHandler } from './middlewares/error-handler';
import { CustomError } from './utils/custom-error';
import { token } from './utils/token';
import { catchAsync } from './utils/catch-async';
import fs from 'node:fs';
import yaml from 'js-yaml';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger('dev'));

// =========== SECURITY ===========
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'give a break to server for one hour 😮‍💨'
});

app.use(express.json({ limit: '10kb' }));
app.use(helmet());
app.use(cors());
app.use(ExpressMongoSanitize());
app.use('/api', limiter);

// =========== END SECURITY ===========

// FIX: for production only
// check validity of token with each request;
// app.use(catchAsync(async (req, res, next) => {

//     await token.checkValidity();
//     req.token = token;
//     next();
// }));

// FIX: for development only
// app.get('/token', async (req, res, next) => {
//     await token.checkValidity();
//     console.log(token.getToken());
//     res.json(token.getToken());
// });

// app.use((req, res, next) => {
//     req.token = {
//         getToken() {
//             return {
//                 "tokenType": "bearer",
//                 "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLmRhYXBhcHAuY29tXC9hcGlcL3YxXC9hZ2VuY3lcL2xvZ2luIiwiaWF0IjoxNjk1MjIzOTIyLCJleHAiOjE2OTUzMTAzMjIsIm5iZiI6MTY5NTIyMzkyMiwianRpIjoiSDdXU0J3QmRGQ3owQ0NwTyIsInN1YiI6MjMsInBydiI6ImU5ODRhYTIxZTRiZTI1NDUxZTJlMzY3M2M3NTkwZThmOGEwYzU1ZDciLCJ1c2VybmFtZSI6InBha2xlYW4ifQ._q2GL1OvEdrdUZBS3B2FyjBanRU1Et1Y-Vt_9vs7izQ",
//                 "expire": 1695310322
//             };
//         }

//     };
//     next();
// });

// const options = yaml.load(fs.readFileSync(`${__dirname}/../swagger.yaml`, 'utf8'));

// const swaggerSpec = swaggerJSDoc(options!);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/hamafarin/v1', mainRouter);

app.use('*', (req, res, next) => {
    return next(new CustomError('No Such URL Sry 🥲', 404, 404));

});

app.use(errorHandler);

export { app };