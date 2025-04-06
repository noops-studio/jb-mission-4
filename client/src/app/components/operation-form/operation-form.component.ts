// client/src/app/components/operation-form/operation-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountOperationsService } from '../../services/account-operations.service';
import { OperationType } from '../../models/account-operation.model';

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.scss'],
  imports: [ReactiveFormsModule]
})
export class OperationFormComponent implements OnInit {
  operationForm: FormGroup;
  operationTypes: { value: OperationType; label: string }[] = [
    { value: 'deposit', label: 'Deposit' },
    { value: 'withdrawal', label: 'Withdrawal' },
    { value: 'loan', label: 'Loan' }
  ];
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountOperationsService,
    private router: Router
  ) {
    this.operationForm = this.createForm();
  }

  ngOnInit(): void {
    // Get the current account number from service
    const accountNumber = this.accountService.getCurrentAccount();
    if (accountNumber) {
      this.operationForm.get('accountNumber')?.setValue(accountNumber);
    } else {
      // If no account number, redirect to main page
      this.router.navigate(['/']);
    }

    // Listen for changes in operation type to adjust form validation
    this.operationForm.get('type')?.valueChanges.subscribe(type => {
      this.updateFormValidation(type);
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      accountNumber: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      type: ['deposit', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      interestRate: [null],
      numberOfPayments: [null]
    });
  }

  updateFormValidation(type: OperationType): void {
    const interestRateControl = this.operationForm.get('interestRate');
    const numberOfPaymentsControl = this.operationForm.get('numberOfPayments');

    if (type === 'loan') {
      interestRateControl?.setValidators([Validators.required, Validators.min(0.01)]);
      numberOfPaymentsControl?.setValidators([Validators.required, Validators.min(1)]);
    } else {
      interestRateControl?.clearValidators();
      numberOfPaymentsControl?.clearValidators();
    }

    interestRateControl?.updateValueAndValidity();
    numberOfPaymentsControl?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.operationForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const operation = this.operationForm.value;

    // Remove unused fields based on operation type
    if (operation.type !== 'loan') {
      delete operation.interestRate;
      delete operation.numberOfPayments;
    }

    this.accountService.addOperation(operation)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'Operation added successfully!';
          
          // Reset form but keep the account number
          const accountNumber = this.operationForm.get('accountNumber')?.value;
          this.operationForm.reset({
            accountNumber,
            type: 'deposit'
          });
          
          // After 2 seconds, redirect back to operations list
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error adding operation:', error);
          this.errorMessage = 'Failed to add operation. Please try again.';
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}