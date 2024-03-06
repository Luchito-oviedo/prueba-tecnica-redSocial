import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import router from './routes/route.js'; // Importamos el enrutador de usuarios

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Cambiamos urlencoded por express.urlencoded
app.use('/api/users', router); // Rutas para usuarios

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGODB_URI;

const start = async () => {
    try {
        await connectDB(MONGO_URI);
        console.log("¡MongoDB Connected!");
        app.listen(PORT, () => {
            console.log(`Server is running http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}
start();
