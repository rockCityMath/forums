import { Component, OnInit } from '@angular/core';

import { ServerService } from '../shared/services/server-interface.service'

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})

export class FeatureComponent implements OnInit {
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


}
