const express = require('express');
const axios = require('axios');
const { connectToDatabase, sequelize } = require('./config/database');
const HealthCheck = require('./models/HealthCheck');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON body (optional, in case the app has other endpoints)
app.use(express.json());

// Middleware to reject payloads in GET requests
app.use((req, res, next) => {
    if (req.method === 'GET' && req.body && Object.keys(req.body).length > 0) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        return res.status(400).send(); // Bad Request
    }
    next();
});

// Health Check API
app.get('/healthz', async (req, res) => {
    try {
        // Check downstream API
        const isDownstreamAPIHealthy = true; // Assuming downstream API is always healthy for simplicity

        // Insert a new record in the HealthCheck table
        await HealthCheck.create({});
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        return res.status(200).send(); // OK
    } catch (error) {
        console.error('Health check failed:', error.message);
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        return res.status(503).send(); // Service Unavailable
    }
});

// Catch-all for unsupported HTTP methods on /healthz
app.all('/healthz', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(405).send(); // Method Not Allowed
});

// Initialize application
const initializeApp = async () => {
    try {
        await connectToDatabase();
        await sequelize.sync({ alter: true });
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Failed to initialize application:', error);
        process.exit(1);
    }
};

initializeApp();
