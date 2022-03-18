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

  ngOnInit(): void {
      
    //If user logged in, get username
      this.authService.isLoggedIn.subscribe(data => {
        if(data) {
          const nameObservable = this.server.getUsernameFromID()
          nameObservable.subscribe((data ) => {
            data = Object.values(data)
            this.username = data
          })
        }
      })
  }
  title = 'forum';
}
