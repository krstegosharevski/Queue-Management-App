import { Component, OnInit } from '@angular/core';
import { BankService } from '../_models/bank_service';
import { BankServicesService } from '../_services/bank-services.service';
import { Service } from '../_models/service';
import { TicketsService } from '../_services/tickets.service';
import { AccountService } from '../_services/account.service';
import { TicketDto } from '../_models/ticketDto';
import { Route, Router } from '@angular/router';
import { SignalRService } from '../_services/signal-r.service';

@Component({
  selector: 'app-number-generator',
  templateUrl: './number-generator.component.html',
  styleUrls: ['./number-generator.component.css']
})
export class NumberGeneratorComponent implements OnInit {
  bankServices: Service[] | null = null;
  selectedServiceId: number | null = null;
  description: string = '';

  constructor(public bankService : BankServicesService, private ticketService: TicketsService,
    private jwtService: AccountService, private router: Router, private signalRService : SignalRService) { }

  ngOnInit(): void {
    this.listServices();
    // this.signalRService.startConnection();
    // this.signalRService.onTicketReceived(ticket => {
    //   console.log('New ticket received:', ticket);
    //   // Логика за обновување на UI со новиот тикет
    // });
  }


  listServices(): void {
    this.bankService.getBankServices().subscribe(
      (data: Service[]) => {
        this.bankServices = data;
        console.log(this.bankServices);
      },
      (error) => {
        console.error('Error fetching bank services:', error);
      }
    );
  }

  generateTicket(): void {
    if (this.selectedServiceId === null) {
      console.error('Please select a service.');
      return;
    }
  
    const token = this.jwtService.getToken(); // Преместете ја JWT токенот од сервисот
    const username = this.jwtService.getUserUsername(); // Метод за добивање на username
  
    console.log(username);
    if (!token) { // Проверете дали `token` е `null` или празен
      console.error('Token is not available.');
      return;
    }
  
    if (!username) { // Проверете дали `username` е `null` или празен
      console.error('Username is not available.');
      return;
    }
  
    const ticketDto: TicketDto = {
      serviceId: this.selectedServiceId,
      ownerUsername: username,
      description: this.description || undefined // Не користете `null` за опционо поле
    };
  
    console.log('Generated ticketDto:', ticketDto);
  
    this.ticketService.createTicket(ticketDto, token).subscribe(
      response => {
        console.log('Ticket created successfully:', response);
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error creating ticket:', error);
        this.router.navigate(['/']);
      }
    );
  }
  

}
