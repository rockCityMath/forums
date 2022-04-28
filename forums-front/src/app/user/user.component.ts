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

  username: any = 'null'
  id: any = "test"
  posts: any[] = []
  user: any;
  userComments: any[] = []
  userStats: any = []
  post: any;

  allPosts: any;
  userOwnsPost: any = true
  numberOfComments: any = false
  selectedPostID= ''

  constructor(private route: ActivatedRoute, private serverService: ServerService, public authService: AuthService) {
    route.params.subscribe(
     (params) => {
       this.id = params['user']
     });
  }

  ngOnInit(): void {
    this.getUserComments()
    this.getUserPosts()
    this.getUserStats()

    this.getUserInfo()

    this.searchByTitle()


    this.authService.isLoggedIn.subscribe(data => {
      if(data) {
        const nameObservable = this.serverService.getUsernameFromID()
        nameObservable.subscribe((data ) => {
          console.log(data)
          data = Object.values(data)
          this.username = data[0]
        })
        const idObservable = this.serverService.getUserID()
        idObservable.subscribe((data: any) => {
          this.id = data.userID
        })
      }
    })
    this.getPostDetails()
    this.checkIfUserOwnsPost(this.id)

    window.location.reload()
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
    window.location.reload()
  }

  checkIfUserOwnsPost(id: any) {
    if(this.post.userID == id) {
      this.userOwnsPost = true
    }
  }

  searchByTitle(){
    const resultsObservable = this.serverService.searchByTitle(
      {query: ""}
    )
    resultsObservable.subscribe((data ) => {
      data = Object.values(data)
      this.allPosts = data
    })
  }

  deletePost(id:any) {
    const postsObservable = this.serverService.deletePost(id)
    postsObservable.subscribe((data) => {
      data = Object.values(data)
      this.post = data
      //this.getUserPosts()
      window.location.reload()
    })
  }

}
