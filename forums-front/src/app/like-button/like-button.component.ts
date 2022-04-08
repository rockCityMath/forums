import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from '../shared/services/server-interface.service'

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})
export class LikeButtonComponent implements OnInit {
  @Input() public post: any;

  userID: any = 0;
  isLiked: Boolean = false

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.getUserID()
  }

  onLikeClick(post: any) {

    if(this.isLiked) {
      const statusObservable = this.serverService.unlikePost(post._id)
      statusObservable.subscribe((data: any) => {

        if(data.err) {
          alert("You have not liked this post!")
        }
        else {
          post.likeCount -= 1;
          this.isLiked = false
        }

      })
    }
    else if(this.serverService.loggedIn) {
      const statusObservable = this.serverService.likePost(post._id)
      statusObservable.subscribe((data: any) => {

        if(data.err) {
          alert("You have already liked this post!")
        }
        else {
          post.likeCount += 1;
          this.isLiked = true
        }

      })
    }
    else{
      alert("You must be logged in to like!")
    }

    

  }

  unlikePost(post: any) {
    const statusObservable = this.serverService.unlikePost(post._id)
    statusObservable.subscribe((data: any) => {

      if(data.err) {
        alert("You have not liked this post!")
      }
      else {
        post.likeCount -= 1;
      }

    })


  }

  getUserID() {
    if(this.serverService.loggedIn) {
      const idObservable = this.serverService.getUserID()
      idObservable.subscribe((data: any) => {
        if(!data.userID) {
          this.userID = 0
        }
        this.userID = data.userID
        this.userHasLiked(this.post.usersThatHaveLiked)
      })
    }
    else {
      this.userID = 0
    }

  }

  userHasLiked(usersThatHaveLiked: any) {
    if(usersThatHaveLiked.includes(this.userID)) {
      console.log('true')
      this.isLiked = true
      
    }
    else {
      this.isLiked = false;
    }
  }

}
