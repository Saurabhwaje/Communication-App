import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
// import { SocketService } from '../socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    // private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  submit(): void {
    this.loginUser();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  private loginUser(): void {
    const loginData = this.form.getRawValue();

    this.http.post(environment.baseUrl + '/api/login', loginData, {
      withCredentials: true
    }).subscribe((response: any) => {
      this.handleLoginSuccess(response);
    });
  }

  private handleLoginSuccess(response: any): void {
    console.log('Logged in user:', response.user); // Console log the name of the logged-in user

    // Uncomment if socket service is used
    // this.socketService.connect(response.user);

    // Uncomment if storing JWT cookie in local storage
    // localStorage.setItem('currentUser', JSON.stringify(response.user));

    // Navigate to the send message page
    this.router.navigate(['/twiliochat']);
  }
}
