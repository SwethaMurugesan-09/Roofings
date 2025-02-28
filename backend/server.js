const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

dotenv.config();

(async () => {
    await connectDB();
})();

app.use(cors());

app.get('/', (req, res) => res.send("API working"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
