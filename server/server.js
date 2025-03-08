import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import { clerkWebhooks } from './controller/webhooks.js'
import connectCloudinary from './config/cloudinary.js'
import productRoutes from './routes/productRoutes.js'

const app = express();

app.use(express.json());

await connectDB();
await connectCloudinary()

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send("API working"));
app.post('/webhooks',clerkWebhooks);


app.use('/api/product',productRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
