import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service'
import { ServerService } from '../shared/services/server-interface.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  username: any = 'null'
  userID: any = ''
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
        const idObservable = this.server.getUserID()
        idObservable.subscribe((data: any) => {
          this.userID = data.userID
        })
      }
    })
  }

}
