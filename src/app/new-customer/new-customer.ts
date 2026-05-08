import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './new-customer.html',
  styleUrls: ['./new-customer.css']
})
export class NewCustomer implements OnInit {
  newCustomerFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      email: this.fb.control(null, [Validators.required, Validators.email])
    });
  }

  handleSaveCustomer() {
    let customer: Customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next: (data: Customer) => {
        alert('Customer has been successfully saved!');
        this.router.navigateByUrl('/customers');
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
