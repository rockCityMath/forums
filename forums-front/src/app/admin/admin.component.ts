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
  userID: any = ''
  userList: any = []
  selectedUser: any = ''
  userPosts: any = []
  selectedPost: any = ''
  userComments: any = []
  selectedComment: any = ''

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

  getUsersComments() {
    const commentObservable = this.serverService.getUserComments(this.selectedUser)
    commentObservable.subscribe((data ) => {
      console.log(data)
      data = Object.values(data)
      this.userComments = data
    })
  }

  deleteUser() {
    const usersObservable = this.serverService.deleteUser(this.selectedUser)
    usersObservable.subscribe((data ) => {
      data = Object.values(data)
      this.userList = data
      this.getUsers()
    })
  }

  deletePost() {
    const postsObservable = this.serverService.deletePost(this.selectedPost)
    postsObservable.subscribe((data) => {
      data = Object.values(data)
      this.userPosts = data
      this.getUsersPosts()
    })
  }

  deleteComment() {

  }
}
