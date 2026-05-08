import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Cutomer } from '../services/cutomer';
import { Customer } from '../services/customer';
import { catchError, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-customers',
  imports: [NgForOf, NgIf, JsonPipe, AsyncPipe],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit {
  customers!: Observable<any>;
  errorMessage!: string;

  constructor(private customer: Customer) {}

  ngOnInit(): void {
    this.customers = this.customer.getCustomers().pipe(
      catchError(error => {
        this.errorMessage=error.message;
        return throwError(error)
      })
    );
  }
}
