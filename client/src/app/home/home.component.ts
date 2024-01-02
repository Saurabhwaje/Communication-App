import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { NavigationExtras, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authenticated = false;
  message = '';
  name = '';
  users: User[] | any;
  currentUser: string;
  otherUsers: User[];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.checkUserAuthentication();
    this.getCurrentUser();
    this.getUsersList();

    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }

  openChatWindow(user: { id: number }): void {
    const navigationExtras: NavigationExtras = {};
    this.router.navigate(['/chatwindowstatic', user.id], navigationExtras);
  }

  private checkUserAuthentication(): void {
    this.http.get(environment.baseUrl + '/api/user', { withCredentials: true }).subscribe(
      (res: any) => {
        this.message = `Hi ${res.name}`;
        this.currentUser = res.id;
        Emitters.authEmitter.emit(true);
      },
      error => {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );
  }

  private getCurrentUser(): void {
    // Uncomment if needed
    // console.log("current User", this.currentUser);
  }

  private getUsersList(): void {
    this.http.get<User[]>(environment.baseUrl + '/api/getalluserslist/?logginusername=a').subscribe(users => {
      this.users = users;
      // Uncomment if needed
      // .filter(user => user.id !== this.currentUser.id);
    });
  }
}
