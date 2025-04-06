// client/src/app/components/operation-card/operation-card.component.ts
import { Component, Input } from '@angular/core';
import { AccountOperation } from '../../models/account-operation.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-operation-card',
  templateUrl: './operation-card.component.html',
  styleUrls: ['./operation-card.component.scss'],
  imports: [CommonModule]
})
export class OperationCardComponent {
  @Input() operation!: AccountOperation;

  getCardClass(): string {
    switch (this.operation.type) {
      case 'deposit': return 'bg-success-subtle';
      case 'withdrawal': return 'bg-danger-subtle';
      case 'loan': return 'bg-warning-subtle';
      default: return '';
    }
  }

  getOperationTypeTranslation(): string {
    switch (this.operation.type) {
      case 'deposit': return 'Deposit';
      case 'withdrawal': return 'Withdrawal';
      case 'loan': return 'Loan';
      default: return this.operation.type;
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString();
  }
}