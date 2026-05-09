import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  isAuthenticated: boolean = false;

  roles: any;
  username: any;
  accessToken! : string;


  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {

      let params = new HttpParams().set('username', username).set('password', password);
      let options = {
        headers : new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded"),

      }

    return this.http.post("http://localhost:8084/auth/login", params, options)

  }

  loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['acces-token'] ?? data['accessToken'] ?? data['access_token'];
    let jwtDecoder: any = jwtDecode(this.accessToken);
    this.username = jwtDecoder.sub;
    this.roles = jwtDecoder.scope;
  }
}
