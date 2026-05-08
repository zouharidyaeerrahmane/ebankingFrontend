import { RouterModule, Routes } from '@angular/router';
import { Customers } from './customers/customers';
import { Accounts } from './accounts/accounts';
import { NgModule } from '@angular/core';
import { NewCustomer } from './new-customer/new-customer';
import { CustomerAccount } from './customer-account/customer-account';

export const routes: Routes = [
  {path:"customers", component : Customers},
  {path:"accounts", component : Accounts  },
  {path:"new-customer", component : NewCustomer},
  {path:"customer-account/:id", component : CustomerAccount},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
