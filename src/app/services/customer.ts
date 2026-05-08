import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Customer {

  constructor(private http: HttpClient) { }

  public getCustomers():Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>('http://localhost:8080/customers');
  }
}
