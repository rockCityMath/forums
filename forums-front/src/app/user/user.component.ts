import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
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
  userStats: any = []
  post: any;
  posts2: any;
  userOwnsPost: any = true
  numberOfComments: any = false

  constructor(private route: ActivatedRoute, private serverService: ServerService, public authService: AuthService) {
    route.params.subscribe(
     (params) => {
       this.id = params['user']
     });
  }

  ngOnInit(): void {
    this.getUserStats()
    this.getUserPosts()
    this.getUserInfo()
    this.getUserComments()
    this.getAllPosts()


    this.authService.isLoggedIn.subscribe(data => {
      if(data) {
        const nameObservable = this.serverService.getUsernameFromID()
        nameObservable.subscribe((data ) => {
          console.log(data)
          data = Object.values(data)
        })
        const idObservable = this.serverService.getUserID()
        idObservable.subscribe((data: any) => {
          this.id = data.userID
        })
      }
    })
    this.getPostDetails()
    this.checkIfUserOwnsPost(this.id)
  }

  getUserStats() {
    const usersObservable = this.serverService.getUserStats(this.id)
    usersObservable.subscribe((data ) => {
      data = Object.values(data)
      this.userStats = data[1]
    })
  }

  getUserPosts() {
    const postsObservable = this.serverService.getUsersPosts(this.id)
    postsObservable.subscribe((data ) => {
      data = Object.values(data)
      this.posts = data[1]
    })
  }

  getAllPosts() {
    const posts2Observable = this.serverService.getAllPosts()
    posts2Observable.subscribe((data ) => {
      data = Object.values(data)
      this.posts2 = data
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

  getPostDetails() {
    const postsObservable = this.serverService.getPostDetails(this.post._id)
    postsObservable.subscribe((data ) => {
      data = Object.values(data)
      this.post = data
    })
  }

  checkIfUserOwnsPost(id: any) {
    if(this.post.userID == id) {
      this.userOwnsPost = true
    }
  }


}
