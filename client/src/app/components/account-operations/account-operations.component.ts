import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountOperationsService } from '../../services/account-operations.service';
import { AccountOperation } from '../../models/account-operation.model';
import { OperationCardComponent } from "../operation-card/operation-card.component";

@Component({
  selector: 'app-account-operations',
  templateUrl: './account-operations.component.html',
  styleUrls: ['./account-operations.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OperationCardComponent
]
})
export class AccountOperationsComponent implements OnInit {
  accountForm!: FormGroup;
  operations: AccountOperation[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountOperationsService,
    private router: Router
  ) {
    console.log('AccountOperationsComponent initialized');
  }

  ngOnInit(): void {
    console.log('AccountOperationsComponent ngOnInit');
    
    // Initialize the form
    this.accountForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    });
    
    // Check if we have a saved account number
    const currentAccount = this.accountService.getCurrentAccount();
    console.log('Current account from service:', currentAccount);
    
    if (currentAccount) {
      this.accountForm.get('accountNumber')?.setValue(currentAccount);
      this.fetchOperations();
    }
  }

  fetchOperations(): void {
    const accountNumber = this.accountForm.get('accountNumber')?.value;
    if (!accountNumber) return;

    console.log('Fetching operations for account:', accountNumber);
    this.loading = true;
    this.errorMessage = '';

    this.accountService.getAccountOperations(accountNumber)
      .subscribe({
        next: (data) => {
          console.log('Operations received:', data);
          this.operations = data;
          this.accountService.setCurrentAccount(accountNumber);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching operations:', error);
          this.errorMessage = 'Failed to load account operations. Please try again.';
          this.loading = false;
        }
      });
  }

  goToNewOperation(): void {
    const accountNumber = this.accountForm.get('accountNumber')?.value;
    if (accountNumber) {
      this.accountService.setCurrentAccount(accountNumber);
      this.router.navigate(['/operations/new']);
    }
  }
}