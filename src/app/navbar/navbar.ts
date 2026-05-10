import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  constructor(private auth: Auth , private router: Router) {}
  ngOnInit() {

  }

  handleLogout(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
