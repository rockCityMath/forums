import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ServerService } from '../shared/services/server-interface.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userList: any = [];

  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    const usersObservable = this.serverService.getUserList()
    usersObservable.subscribe((data ) => {
      data = Object.values(data)
      this.userList = data
    })
  }

}
