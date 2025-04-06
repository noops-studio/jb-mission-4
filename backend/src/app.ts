// server/src/app.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { json } from 'body-parser';
import { accountOperationsRoutes } from './routes/accountOperations';

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use('/api/account-operations', accountOperationsRoutes);

// Database connection



if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined');
}else {
  console.log('MONGODB_URI:', process.env.MONGODB_URI);
}
const mongoUrl:string = process.env.MONGODB_URI
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;