// client/src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountOperationsComponent } from './components/account-operations/account-operations.component';
import { OperationFormComponent } from './components/operation-form/operation-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AppComponent {
  title = 'Bank Operations Management';
}