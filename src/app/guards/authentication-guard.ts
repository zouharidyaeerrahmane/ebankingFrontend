import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { routes } from '../app.routes';
import { Auth } from '../services/auth';

@Injectable({providedIn : 'root'})
export class AuthenticationGuard implements CanActivate {
  constructor(private auth : Auth , private router : Router) {}


  canActivate(){
    if(this.auth.isAuthenticated) {
      return true;
    }else {
      this.router.navigateByUrl('/login');
      return false;
    }

  }
}

