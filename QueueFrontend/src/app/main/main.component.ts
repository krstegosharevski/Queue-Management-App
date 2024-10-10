import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Counter } from '../_models/counter';
import { CountersService } from '../_services/counters.service';
import { Ticket } from '../_models/ticket';
import { TicketsService } from '../_services/tickets.service';
import { Service } from '../_models/service';
import { BankServicesService } from '../_services/bank-services.service';
import { BankService } from '../_models/bank_service';
import { CounterDto } from '../_models/counterDto';
import { SignalRService } from '../_services/signal-r.service';
import { Counter2 } from '../_models/counter2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  counters: Counter[] | null = null;
  tickets: Ticket[] = [];
  services: Service[] = [];
  isAdmin: boolean = false;
  isUserLoggedIn: boolean = true;
  calledTickets: Ticket[] = [];

  

  constructor(private authService: AuthService, 
              private counterService: CountersService, 
              private ticketsService: TicketsService,
              private servicesService: BankServicesService,
              private signalRService: SignalRService) {}

  ngOnInit() {
    this.checkUserStatus();
    this.isAdmin = this.authService.isAdmin();
    this.listCounters();
    this.servicesService.getBankServices().subscribe(services => this.services = services);

    this.ticketsService.getPendingTickets().subscribe(
    (data: Ticket[]) => {
      this.tickets = data;
    },
    (error) => {
      console.error('Error fetching tickets:', error);
    }
  );

  this.ticketsService.getCalledTickets().subscribe(
    (data: Ticket[]) => {
      this.calledTickets = data;
    },
    (error) => {
      console.error('Error fetching tickets:', error);
    }
  );

   this.signalRService.startConnection();
    this.signalRService.onTicketReceived(ticket => {
      this.tickets.push(ticket);
      console.log('New ticket received:', ticket);
    });
   
    this.signalRService.receiveCounterUpdate((counterId: number) => {
      // Освежи го списокот на шалтери
      this.listCounters();
    });

    this.signalRService.receiveTicketAssigned((counterId: number, ticketId: number) => {
      // this.counters?.forEach(el => el.counterId == counterId {
      // })
      this.listCounters();
    });
  }

 


  listCounters(): void {
    this.counterService.getCounters().subscribe(
      (data: Counter[]) => {
        this.counters = data;
        console.log(this.counters);
      },
      (error) => {
        console.error('Error fetching bank services:', error);
      }
    );

    this.ticketsService.getPendingTickets().subscribe(
      (data: Ticket[]) => {
        this.tickets = data;
      },
      (error) => {
        console.error('Error fetching tickets:', error);
      } )

      this.ticketsService.getCalledTickets().subscribe(
        (data: Ticket[]) => {
          this.calledTickets = data;
        },
        (error) => {
          console.error('Error fetching tickets:', error);
        }
      );
  }


  getTicketName(ticketId: number) {
    console.log(this.calledTickets);
    const ticket = this.calledTickets.find(t => t.ticketId === Number(ticketId));
   
    return ticket?.ticketNumber

  }
  

  getServiceName(serviceId: number): string {
    const service = this.services.find(s => s.serviceId === serviceId);
    return service ? service.name : 'Не позната услуга';
  }

  checkUserStatus() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.isUserLoggedIn = !!user.token; // Проверува дали има JWT токен
    } else {
      this.isUserLoggedIn = false;
    }
  }

  closeCounterAndAssignTicket(counterId: number, name: string, isEmpty: boolean, ticketId : number) {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).token : '';
    const counterDto : CounterDto = {
      counterId: counterId,
      name: name,
      isEmpty: isEmpty,
      ticketId : ticketId
    };

    // Прво ослободи го шалтерот
    this.counterService.freeCounter2(counterDto).subscribe(
      () => {
        console.log('Counter has been freed.');
        
        this.listCounters()   
      },
      error => {
        console.error('Error freeing counter:', error);
      }
    );

    
  }


  takeTicket(counterId:number){
    this.ticketsService.assignTicketToCounter(counterId).subscribe(
      () => {
        console.log("Ticket aasigned successfully!");
        this.signalRService.receiveTicketAssigned((counterId: number, ticketId: number) => {
          if (this.counters) {
            const counter = this.counters.find(c => c.counterId === counterId);
            if (counter) {
              counter.ticketId = ticketId;
              counter.isEmpty = false;
              // Можете да го користите Angular Change Detection за да ја прикажете промената веднаш
            }
          }
        });
        this.listCounters()
      },
      error => {
        console.log('Error assigning ticket', error);
      }
    )
  }

}
