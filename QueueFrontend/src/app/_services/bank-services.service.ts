import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankService } from '../_models/bank_service';
import { Observable } from 'rxjs';
import { Service } from '../_models/service';

@Injectable({
  providedIn: 'root'
})
export class BankServicesService {
  baseUrl = 'https://localhost:7146/api/';
 

  constructor(private http: HttpClient) { }

  // getBankServices(){
  //   return this.http.get(this.baseUrl + '/services');
  // }
  getBankServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.baseUrl + "services");
  }

  
}
