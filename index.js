import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import './database/connectdb.js';
import authRouter from './routes/auth.route.js';

const PORT = process.env.PORT || 5000;

const app = express();
//~ middlewares
app.use(express.json());
app.use(cors());
app.use('/api/v1/auth', authRouter)

app.listen(5000, () => {
  console.log(`🌟 👽 🌟 App lista en el puerto ${PORT}`);
})