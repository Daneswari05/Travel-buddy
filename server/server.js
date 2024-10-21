import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';

// routes
import userRoutes from './routes/user.routes.js';
import tripRoutes from './routes/trip.routes.js';

const app = express();

// config
connectDB();
dotenv.config();

// middleware
app.use(cors());
app.use(json());

// routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);

// error handling
app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
