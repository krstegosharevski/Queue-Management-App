import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {}

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.router.navigate(['/']);
      },
      error: error => console.log(error)
    })
  }

  cancel(){
    console.log('cancelled');
  }

}
