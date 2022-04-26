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
  postID: any = ''

  constructor(private serverService: ServerService, private router: Router) { }

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


}
