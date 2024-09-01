import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './src/routes/authRoutes.js';  
import patientRoutes from './src/routes/patientRoutes.js';  
import doctorRoutes from './src/routes/doctorRoutes.js';  
import staffRoutes from './src/routes/staffRoutes.js';  

dotenv.config();

const app = express();


app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
}));
app.use(bodyParser.json()); 
app.use(express.json());


app.options('*', cors());


mongoose.connect(process.env.MONGO_URI, {
})
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(`MongoDB connection error: ${error.message}`));


app.get('/', (req, res) => {
    res.send('Hello World');
});


app.use('/api/auth', authRoutes); 
app.use('/api/patient', patientRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/staff', staffRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
