import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App implements OnInit{
  protected readonly title = signal('ebanking_frontend');
  constructor(private router: Router, private auth: Auth) {
  }
  ngOnInit(): void {
    this.auth.loadJwtTokenFromLocalStorage();
  }
}
