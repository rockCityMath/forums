import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../shared/services/server-interface.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userList: any = []
  userID: any = ''
  selectedUser: any = ''
  userPosts: any = []

  constructor(private route: ActivatedRoute, private serverService: ServerService, private router: Router) { }

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

  getUsersPosts() {
    const postsObservable = this.serverService.getUsersPosts(this.selectedUser)
    postsObservable.subscribe((data) => {
      data = Object.values(data)
      this.userPosts = data
    })
  }

}
