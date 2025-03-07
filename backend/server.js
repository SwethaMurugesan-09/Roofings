const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
import {clerkMiddleware} from '@clerk/express'
import { clerkWebhooks } from './controller/webhooks.js'

const app = express();

dotenv.config();

(async () => {
    await connectDB();
})();

app.use(cors());
app.use(clerkMiddleware())

app.get('/', (req, res) => res.send("API working"));
app.post('/webhooks',clerkWebhooks);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
