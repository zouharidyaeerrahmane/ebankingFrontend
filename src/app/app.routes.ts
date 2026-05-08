import { RouterModule, Routes } from '@angular/router';
import { Customers } from './customers/customers';
import { Accounts } from './accounts/accounts';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {path:"customers", component : Customers},
  {path:"accounts", component : Accounts  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
