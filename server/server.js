import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import productRoutes from './routes/productRoutes.js'

const app = express();

app.use(express.json());

await connectDB();
await connectCloudinary()
const allowedOrigins = [
    'http://localhost:3000', 
    'https://roofings-server.vercel.app'
  ];
  
  const corsOptions = {
      origin: "*", 
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type,Authorization"
  };
  
  app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send("API working"));


app.use('/api/product',productRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
