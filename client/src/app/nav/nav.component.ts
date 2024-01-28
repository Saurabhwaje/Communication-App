import { Component, OnInit } from "@angular/core";
import { Emitters } from "../emitters/emitters";
import { HttpClient } from "@angular/common/http";
import { SocketService } from "../socket.service";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  authenticated = false;
  userName: any;

  constructor(
    private http: HttpClient,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.handleAuthentication(auth);
    });
  }

  logout(): void {
    this.clearLocalStorage();
    this.performLogoutOperations();
    this.socketService.disconnect();
  }

  private handleAuthentication(auth: boolean): void {
    this.authenticated = auth;
    if (auth) {
      this.getCurrentUser();
    }
  }

  private getCurrentUser(): void {
    this.http
      .get(environment.baseUrl + "/api/user", { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.userName = res.name;
          // Uncomment if needed
          // this.socketService.connect(res.name);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  private clearLocalStorage(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  private performLogoutOperations(): void {
    this.http
      .post(environment.baseUrl + "/api/logout", {}, { withCredentials: true })
      .subscribe(() => {
        this.authenticated = false;
        this.userName = null;
      });
  }
}

// OLD

// import { Component, OnInit } from '@angular/core';
// import { Emitters } from '../emitters/emitters';
// import { HttpClient} from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-nav',
//   templateUrl: './nav.component.html',
//   styleUrls: ['./nav.component.css']
// })
// export class NavComponent implements OnInit {
//   authenticated = false;
//   userName: any;

//   constructor(private http: HttpClient) {
//   }

//   ngOnInit() {

//     Emitters.authEmitter.subscribe(
//       (auth: boolean) => {
//         this.authenticated = auth;
//         if (auth) {
//           // console.log("At the right place");
//           this.http.get('http://localhost:3000/api/user', { withCredentials: true }).subscribe(
//             (res: any) => {
//               this.userName = res.name;
//             },
//             error => {
//               console.log(error);
//             }
//           );
//         }
//       }
//     );
//   }

//   logout(): void {
//     this.http.post('http://localhost:3000/api/logout', {}, {withCredentials: true})
//       .subscribe(() => {
//         this.authenticated = false,
//         this.userName = null
//       }
//         );
//   }
// }
