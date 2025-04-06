export type OperationType = 'deposit' | 'withdrawal' | 'loan';

export interface AccountOperation {
  _id?: string;
  accountNumber: string;
  type: OperationType;
  amount: number;
  date: Date;
  interestRate?: number;
  numberOfPayments?: number;
}

export interface DepositOperation {
  accountNumber: string;
  type: 'deposit';
  amount: number;
}

export interface WithdrawalOperation {
  accountNumber: string;
  type: 'withdrawal';
  amount: number;
}

export interface LoanOperation {
  accountNumber: string;
  type: 'loan';
  amount: number;
  interestRate: number;
  numberOfPayments: number;
}