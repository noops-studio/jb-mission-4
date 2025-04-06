// server/src/routes/accountOperations.ts
import { Router } from 'express';
import { AccountOperation, IAccountOperation } from '../models/accountOperation';

const router = Router();

// GET - Fetch all operations for a specific account
router.get('/:accountNumber', async (req, res) => {
  try {
    const { accountNumber } = req.params;
    
    const operations = await AccountOperation.find({ accountNumber }).sort({ date: -1 });
    
    res.status(200).json(operations);
  } catch (error) {
    console.error('Error fetching account operations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST - Add a new operation
router.post('/', async (req, res) => {
  try {
    const operationData = req.body;
    
    // Basic validation
    if (!operationData.accountNumber || !operationData.type || !operationData.amount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Additional validation for loan operations
    if (operationData.type === 'loan' && (!operationData.interestRate || !operationData.numberOfPayments)) {
      return res.status(400).json({ message: 'Loan operations require interest rate and number of payments' });
    }
    
    const newOperation = new AccountOperation({
      ...operationData,
      date: new Date()
    });
    
    await newOperation.save();
    
    res.status(201).json(newOperation);
  } catch (error) {
    console.error('Error adding account operation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export const accountOperationsRoutes = router;