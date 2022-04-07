import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { ServerService } from '../shared/services/server-interface.service'

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})

export class RecentComponent implements OnInit {
  mostRecentPosts: any = [];
  mostLikedPosts: any = [];
  userID: any = ''

  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
    this.getMostRecent();
    this.getMostLiked();
    this.getUserID();
  }

  getMostRecent() {
    const postsObservable = this.serverService.getMostRecent()
    postsObservable.subscribe((data ) => {
      data = Object.values(data)
      this.mostRecentPosts= data
    })
  }

  getMostLiked() {
    const postsObservable = this.serverService.getMostLiked()
    postsObservable.subscribe((data ) => {
      data = Object.values(data)
      this.mostLikedPosts = data
    })
  }

  likePost(post: any) {

    const statusObservable = this.serverService.likePost(post._id)
    statusObservable.subscribe((data: any) => {
      
      if(data.err) {
        alert("You have already liked this post!")
      }
      else {
        post.likeCount += 1;
      }

    })
    window.location.reload()

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

    window.location.reload()

    
  }

  getUserID() {
    const idObservable = this.serverService.getUserID()
    idObservable.subscribe((data: any) => {
      if(!data.userID) {
        this.userID = 0
      }
      this.userID = data.userID
    })
  }

  userHasLiked(usersThatHaveLiked: any) {

    if(usersThatHaveLiked.includes(this.userID)) {  
      return true
    }
    else {
      return false;
    }
  }


}
