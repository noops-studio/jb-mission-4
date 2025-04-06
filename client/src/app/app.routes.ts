import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/account-operations/account-operations.component')
      .then(m => m.AccountOperationsComponent)
  },
  {
    path: 'operations/new',
    loadComponent: () => import('./components/operation-form/operation-form.component')
      .then(m => m.OperationFormComponent)
  },
  { path: '**', redirectTo: '' }
];