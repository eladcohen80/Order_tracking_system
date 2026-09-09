import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import orderRoutes from './routes/orderRoutes';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import supplierRoutes from './routes/supplierRoutes';
import productRoutes from './routes/productRoutes';
import budgetRoutes from './routes/budgetRoutes';
import ragRoutes from './routes/ragRoutes'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);
app.use('/budgets', budgetRoutes);
app.use('/api/rag', ragRoutes)
app.get('/health', (_req, res) => {
  res.json({status: 'ok'})
})

export default app