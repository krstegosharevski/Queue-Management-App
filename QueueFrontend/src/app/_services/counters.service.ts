import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Counter } from '../_models/counter';
import { Observable } from 'rxjs';
import { CounterDto } from '../_models/counterDto';

@Injectable({
  providedIn: 'root'
})
export class CountersService {

  baseUrl = 'https://localhost:7146/api/';
 

  constructor(private http: HttpClient) { }

 
  getCounters(): Observable<Counter[]> {
    return this.http.get<Counter[]>(this.baseUrl + "counters");
  }

  //Da vidime dali ke funkc.
  freeCounter(counterId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.baseUrl + 'counters/free-counter', { counterId }, { headers });
  }

  freeCounter2(counterDto : CounterDto): Observable<any> {
  
    return this.http.post(this.baseUrl + 'counters/free-counter', counterDto);
  }
}
