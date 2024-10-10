import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection : HubConnection | undefined

  constructor() { }

  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7146/ticketHub') // URL на вашето SignalR Hub
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR connected'))
      .catch(err => console.log('Error while establishing SignalR connection: ', err));
  }

  //тука работам
  public receiveTicketAssigned(callback: (counterId: number, ticketId: number) => void): void {
    if (this.hubConnection){
      this.hubConnection.on('ReceiveTicketAssigned', (counterId: number, ticketId: number) => {
      callback(counterId, ticketId);
    });
    }
  }

  public onTicketReceived(callback: (ticket: any) => void): void {
    if (this.hubConnection) {
      this.hubConnection.on('ReceiveNewTicket', (ticket: any) => {
        callback(ticket);
      });
    }
  }

  public receiveCounterUpdate(callback: (counterId: number) => void): void {
    if(this.hubConnection){
       this.hubConnection.on('ReceiveCounterUpdate', (counterId: number) => {
      callback(counterId);
    });
    }
  }

  // public onTicketAssigned(callback: (data: any) => void): void {
  //   if (this.hubConnection) {
  //     this.hubConnection.on('ReceiveTicketAssigned', (data: any) => {
  //       callback(data);
  //     });
  //   }
  // }

  // public onCounterFreed(callback: (data: any) => void): void {
  //   if (this.hubConnection) {
  //     this.hubConnection.on('ReceiveCounterFreed', (data: any) => {
  //       callback(data);
  //     });
  //   }
  // }

  public onCounterFreed(callback: (counterId: number) => void): void {
    this.hubConnection?.on('CounterFreed', callback);
  }

 
}
