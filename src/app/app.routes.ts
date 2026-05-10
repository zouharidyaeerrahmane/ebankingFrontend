import { RouterModule, Routes } from '@angular/router';
import { Customers } from './customers/customers';
import { Accounts } from './accounts/accounts';
import { NgModule } from '@angular/core';
import { NewCustomer } from './new-customer/new-customer';
import { CustomerAccount } from './customer-account/customer-account';
import {Login} from './login/login';
import { AdminTemplate } from './admin-template/admin-template';
import { AuthenticationGuard } from './guards/authentication-guard';
import { AuthorizationGuard } from './guards/authorization-guard';
import { NotAuthorized } from './not-authorized/not-authorized';



export const routes: Routes = [

  {path:"admin", component : AdminTemplate, canActivate : [AuthenticationGuard], children : [
      {path:"customers", component : Customers},
      {path:"accounts", component : Accounts  },
      {path:"new-customer", component : NewCustomer , canActivate : [AuthorizationGuard], data : {roles : ["ADMIN"]}},
      {path:"customer-account/:id", component : CustomerAccount},
      {path:"", redirectTo:"customers", pathMatch:"full"},
      {path:"not-authorized", component : NotAuthorized},
    ]  },

  {path:"login", component : Login},
  {path:"", redirectTo:"/login", pathMatch:"full"},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
