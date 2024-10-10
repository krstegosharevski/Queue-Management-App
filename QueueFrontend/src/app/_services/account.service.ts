import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { UserToken } from '../_models/userToken';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:7146/api/';
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();


  constructor(private http: HttpClient) { }

  login(model: any){
    //this.loggedInSource.next(true);
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if(user){
          this.setCurrentUser(user);
          // localStorage.setItem('user', JSON.stringify(user));
          // this.currentUserSource.next(user);
        }
      })
    )
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if(user){
          this.setCurrentUser(user);
          // localStorage.setItem('user', JSON.stringify(user));
          // this.currentUserSource.next(user);
        }
       // return user;
      })
    )
  }

  // setCurrentUser(user: UserToken){
  //   this.currentUserSource.next(user);
  // }
  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    // Your logout logic here.
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    //this.loggedInSource.next(false);
  }

  getUserUsername(): string {
    const userString = localStorage.getItem('user');
    if (!userString) return '';
  
    const user = JSON.parse(userString);
    return user ? user.username || '' : '';
  }

  getToken(): string | null {
    const userString = localStorage.getItem('user');
    if (!userString) return null;
    
    const user = JSON.parse(userString);
    return user ? user.token : null;
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
  }
  // getCurrentUserValue(): UserToken | null {
  //   return this.currentUserSource.getValue();
  // }
}
