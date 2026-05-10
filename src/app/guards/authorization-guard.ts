import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Auth } from '../services/auth';

Injectable({providedIn : 'root'})
export class AuthorizationGuard implements CanActivate {
  constructor( private auth : Auth, private router : Router) {}


  canActivate(){
    if(this.auth.roles.includes('ROLE_ADMIN')) {
      return true;
    }else {

      this.router.navigateByUrl('/admin/not-authorized');
      return false;
    }
  }
}
