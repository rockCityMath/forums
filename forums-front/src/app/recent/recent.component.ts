import { Component, OnInit } from '@angular/core';

import { ServerService } from '../shared/services/server-interface.service'

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})

export class RecentComponent implements OnInit {
  mostRecentPosts: any = [];
  mostLikedPosts: any = [];

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.getMostRecent();
    this.getMostLiked();
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

  likePost(id: any) {
    console.log("called like")
    const statusObservable = this.serverService.likePost(id)
    statusObservable.subscribe((data) => {
      console.log(data)
    })
  }

  test() {
    console.log("testing")
  }


}
