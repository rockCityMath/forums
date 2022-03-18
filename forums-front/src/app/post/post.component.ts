import { getSafePropertyAccessString } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Post } from '../post';


import { ServerService } from '../shared/services/server-interface.service'

import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: any = ""
  id: any = ""
  comments: any = ""

  constructor(private route: ActivatedRoute, private serverService: ServerService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getPostDetails()
  }

  getPostDetails() {
    const postsObservable = this.serverService.getPostDetails(this.id)
    postsObservable.subscribe((data ) => {
      data = Object.values(data)
      this.post = data[1]

      this.post.comments.forEach(element => {
        this.getPostComment(element)
      });
    })
  }

  getPostComment(commentID) {
    const commentsObservable = this.serverService.getComment(commentID)
    commentsObservable.subscribe((data ) => {

      data = Object.values(data)
      this.comments = data[1]

    })
  }

  ngOnDestroy() {

  }
}