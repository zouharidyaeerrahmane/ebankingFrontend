import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../services/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  formLogin!: FormGroup;
  constructor(private fb: FormBuilder, private auth : Auth , private router: Router) {}
  ngOnInit() {
    this.formLogin = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  protected handleLogin() {
    let username =this.formLogin.value.username;
    let password =this.formLogin.value.password;
    this.auth.login(username, password).subscribe(
      {
        next: (data: any) => {
          this.auth.loadProfile(data);
          this.router.navigateByUrl('/admin/customers');
        },
        error: err => {console.log(err)},
      }
    )
  }
}
