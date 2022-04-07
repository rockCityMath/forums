import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthService } from '../shared/services/auth.service'
import { ServerService } from '../shared/services/server-interface.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private server: ServerService) { }

  username: any = "null"
  isAdmin: Boolean = false
  userID: any = ''

  ngOnInit(): void {

    //If user logged in, get username
      this.authService.isLoggedIn.subscribe(data => {
        if(data) {
          const nameObservable = this.server.getUsernameFromID()
          nameObservable.subscribe((data ) => {
            console.log(data)
            data = Object.values(data)
            this.username = data[0]
            this.isAdmin = data[1]
          })
          const idObservable = this.server.getUserID()
          idObservable.subscribe((data: any) => {
            this.userID = data.userID
          })
        }
      })
  }
  title = 'Pigeon';
}
