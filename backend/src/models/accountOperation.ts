// server/src/models/accountOperation.ts
import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the document
export interface IAccountOperation extends Document {
  accountNumber: string;
  type: 'deposit' | 'withdrawal' | 'loan';
  amount: number;
  date: Date;
  interestRate?: number;
  numberOfPayments?: number;
}

// Define the schema
const accountOperationSchema = new Schema<IAccountOperation>({
  accountNumber: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    required: true, 
    enum: ['deposit', 'withdrawal', 'loan'] 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  interestRate: { 
    type: Number, 
    required: function() { return this.type === 'loan'; } 
  },
  numberOfPayments: { 
    type: Number, 
    required: function() { return this.type === 'loan'; } 
  }
});

// Create and export the model
export const AccountOperation = mongoose.model<IAccountOperation>('AccountOperation', accountOperationSchema, 'AccountOperations');