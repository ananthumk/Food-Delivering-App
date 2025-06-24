import express from 'express';
import cors from 'cors';    
import { connectDB } from './config/db.js'; 
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoutes.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js'; 


// app config 
const app = express();
const PORT = 4000;

// middleware 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
   res.send('Api is working fine');
})

//connect db 
connectDB();

//API Endpoints
app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.listen(PORT, () => {
    console.log(`Server started at http://localhost: ${PORT}`);
})