import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Customer } from '../services/customer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-account',
  standalone: true,
  imports: [NgIf],
  templateUrl: './customer-account.html',
  styleUrl: './customer-account.css',
})
export class CustomerAccount implements OnInit {
  customerId!: string;
  customer!: Customer;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
  }

  goBack(): void {
    this.router.navigateByUrl('/customers');
  }
}
