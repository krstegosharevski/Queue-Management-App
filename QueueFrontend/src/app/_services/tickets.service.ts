import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../_models/ticket';
import { TicketDto } from '../_models/ticketDto';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private baseUrl = 'https://localhost:7146/api/ticket/';

  constructor(private http: HttpClient) { }

  getPendingTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.baseUrl);
  }

  getCalledTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.baseUrl + 'called');
  }

  createTicket(ticketDto: TicketDto, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.baseUrl + 'generate-ticket', ticketDto, { headers });
  }

  //Da vidime dali ke funkc..
  assignTicket(): Observable<any> {
    return this.http.post(this.baseUrl + 'assign-ticket', {});
  }

  assignTicketToCounter(counterId : number): Observable<any>{
    return this.http.post(this.baseUrl + 'assign-ticket-to-counter/'+counterId, {});
  }
}
