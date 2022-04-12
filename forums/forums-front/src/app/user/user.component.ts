import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { ServerService } from '../shared/services/server-interface.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  //@Input() user?: User;

  id: any = "test"
  posts: any[] = []
  user: any;
  userComments: any[] = []

  constructor(private route: ActivatedRoute, private serverService: ServerService) {
    route.params.subscribe(
     (params) => {
       this.id = params['user']
     });
  }

  ngOnInit(): void {
    this.getUserPosts()
    this.getUserInfo()
    this.getUserComments()
  }


  getUserPosts() {
    const postsObservable = this.serverService.getUsersPosts(this.id)
    postsObservable.subscribe((data ) => {
      data = Object.values(data)
      this.posts = data[1]
    })
  }

  getUserInfo() {
    const userObservable = this.serverService.getUser(this.id)
    userObservable.subscribe((data ) => {
      data = Object.values(data)
      this.user = data[1]
    })
  }

  getUserComments() {
    const userObservable = this.serverService.getUserComments(this.id)
    userObservable.subscribe((data ) => {
      console.log(data)
      data = Object.values(data)
      this.userComments = data[1]
    })
  }

/*
  getUsers(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser()
      .subscribe(users => this.users = users);
  }*/


}
