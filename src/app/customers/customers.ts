import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Customer, CustomerService } from '../services/customer';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  imports: [NgForOf, NgIf, ReactiveFormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit {
  customers: Customer[] = [];
  errorMessage: string = '';
  searchFormGroup!: FormGroup;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
    });
    this.loadCustomers();
  }

  loadCustomers() {
    this.errorMessage = '';
    this.customerService.getCustomers().subscribe({
      next: (data) => { this.customers = data; },
      error: (err) => { this.errorMessage = err.message; },
    });
  }

  handleSearchCustomers() {
    let kw = this.searchFormGroup.value.keyword;
    this.errorMessage = '';
    this.customerService.searchCustomers(kw).subscribe({
      next: (data) => { this.customers = data; },
      error: (err) => { this.errorMessage = err.message; },
    });
  }

  handleDeleteCustomer(c: Customer) {
    if (!confirm('Are you sure?')) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next: () => {
        this.customers = this.customers.filter((item) => item.id !== c.id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleCustomerAccounts(customer: Customer) {
    this.router.navigateByUrl('/customer-account/' + customer.id, { state: customer });
  }
}
