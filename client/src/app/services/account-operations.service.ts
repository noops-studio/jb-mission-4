import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AccountOperation } from '../models/account-operation.model';

@Injectable({
  providedIn: 'root'
})
export class AccountOperationsService {
  // Make sure this matches your backend URL in development
  private apiUrl = 'http://localhost:3000/api/account-operations';
  
  // BehaviorSubject to store the current account number
  private currentAccountNumber = new BehaviorSubject<string>('');
  currentAccount$ = this.currentAccountNumber.asObservable();

  constructor(private http: HttpClient) {
    console.log('AccountOperationsService initialized');
  }

  // Set current account number
  setCurrentAccount(accountNumber: string): void {
    console.log('Setting current account:', accountNumber);
    this.currentAccountNumber.next(accountNumber);
  }

  // Get current account number
  getCurrentAccount(): string {
    return this.currentAccountNumber.value;
  }

  // Get all operations for a specific account
  getAccountOperations(accountNumber: string): Observable<AccountOperation[]> {
    console.log('Fetching operations for account:', accountNumber);
    return this.http.get<AccountOperation[]>(`${this.apiUrl}/${accountNumber}`);
  }

  // Add a new operation
  addOperation(operation: AccountOperation): Observable<AccountOperation> {
    console.log('Adding operation:', operation);
    return this.http.post<AccountOperation>(this.apiUrl, operation);
  }
}