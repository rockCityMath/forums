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
  userStats: any = []

  constructor(private route: ActivatedRoute, private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    const usersObservable = this.serverService.getUserList()
    usersObservable.subscribe((data ) => {
      data = Object.values(data)
      this.userList = data
    })
  }

  getUserStats() {
    const usersObservable = this.serverService.getUserStats(this.selectedUser)
    usersObservable.subscribe((data ) => {
      data = Object.values(data)
      this.userStats = data[1]
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

  changeAdmin(currentlyAdmin: any){
    const request = this.serverService.changeAdmin(
      {isAdmin: (!currentlyAdmin ? "true" : "false" )},
      this.selectedUser)
    request.subscribe(() => {
      alert("Changed user's admin status to " + (!currentlyAdmin ? "true" : "false" ) )
      this.router.navigate(['/admin/'])
    })
/*
    if(this.isAdmin == false){
      const request = this.serverService.changeAdmin(
        {isAdmin: true},
        this.selectedUser)
      request.subscribe(() => {
        alert("Changed user's admin status to true")
        this.router.navigate(['/admin/'])
      })
    }else{
      const request = this.serverService.changeAdmin(
        {isAdmin: false},
        this.selectedUser)
      request.subscribe(() => {
        alert("Changed user's admin status to false")
        this.router.navigate(['/admin/'])
      })
    }*/
  }

  deleteComment() {

  }
}
