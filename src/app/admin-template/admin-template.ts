import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-template',
  imports: [Navbar, RouterOutlet],
  templateUrl: './admin-template.html',
  styleUrl: './admin-template.css',
})
export class AdminTemplate {}
