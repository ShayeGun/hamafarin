import { app } from './app';
import env from 'dotenv';
import mongoose from "mongoose";
import { checkEnvVar } from './utils/check-environment-variables';

env.config({ path: `${__dirname}/../.env` });

// environment variables check
checkEnvVar('PORT', 'BASE_URL', 'PLANS_URL');

// mongoose.connect(process.env.MONGODB_URL!,
//     {
//         user: process.env.DBUSERNAME,
//         pass: process.env.PASSWORD,
//         dbName: process.env.DATABASE
//     }
// ).then(() => {
//     console.log('Daap MongoDB connected');
// }).catch((err) => {
//     console.error('Daap MongoDB connection error', err);
// });

const port = process.env.PORT || 7892;

const server = app.listen(port, () => {
    console.log(`listening on port ${port} ...`);
});

process.on('unhandledRejection', (err: Error) => {
    console.log(err.name, err.message);

    server.close(() => {
        console.log('App in shutting down ❌');

        process.exit(1);
    });
});