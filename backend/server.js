const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { clerkMiddleware } = require('@clerk/express');
const { clerkWebhooks } = require('./controller/webhooks.js');


const app = express();

dotenv.config();

(async () => {
    await connectDB();
})();

app.use(cors());
app.use(clerkMiddleware())

app.get('/', (req, res) => res.send("API working"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
