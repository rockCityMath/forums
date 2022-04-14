import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { AuthService } from '../shared/services/auth.service'
import { ServerService } from '../shared/services/server-interface.service';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, public authService: AuthService, private server: ServerService, private searchService: SearchService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  search!: FormGroup;
  query: any = '';
  username: any = "null"
  isAdmin: Boolean = false
  userID: any = ''
  title = 'Pigeon';

  ngOnInit(): void {

    this.search = this.fb.group({
      searchQuery: ['']
    });

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

  onSearch(){
        this.query = this.search.get('searchQuery')!.value;
        this.searchService.nextQuery(this.query);
        this.router.navigate(['/search/', this.query]);
  }

}




