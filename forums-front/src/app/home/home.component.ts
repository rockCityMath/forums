/*
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
*/

import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthService } from '../shared/services/auth.service'
import { ServerService } from '../shared/services/server-interface.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  username: any = "null"
  isAdmin: Boolean = false

  constructor(public authService: AuthService, private server: ServerService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(data => {
      if(data) {
        const nameObservable = this.server.getUsernameFromID()
        nameObservable.subscribe((data ) => {
          console.log(data)
          data = Object.values(data)
          this.username = data[0]
          this.isAdmin = data[1]
        })
      }
    })
  }

}

