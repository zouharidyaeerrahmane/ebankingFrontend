import { RouterModule, Routes } from '@angular/router';
import { Customers } from './customers/customers';
import { Accounts } from './accounts/accounts';
import { NgModule } from '@angular/core';
import { NewCustomer } from './new-customer/new-customer';
import { CustomerAccount } from './customer-account/customer-account';
import {Login} from './login/login';
import { AdminTemplate } from './admin-template/admin-template';

export const routes: Routes = [

  {path:"admin", component : AdminTemplate, children : [
      {path:"customers", component : Customers},
      {path:"accounts", component : Accounts  },
      {path:"new-customer", component : NewCustomer},
      {path:"customer-account/:id", component : CustomerAccount},
      {path:"", redirectTo:"customers", pathMatch:"full"},
    ]  },

  {path:"login", component : Login},
  {path:"", redirectTo:"/login", pathMatch:"full"},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
