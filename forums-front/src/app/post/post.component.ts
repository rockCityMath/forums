import { getSafePropertyAccessString } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ServerService } from '../shared/services/server-interface.service'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: any;
  id: any = []
  comments: any = [];
  userID = 0
  userOwnsPost = false
  username? = ''
  selectedCommentID = ''

  constructor(private route: ActivatedRoute, private serverService: ServerService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getPostDetails()
    this.getPostComments()
    this.getUsername()
  }

  getPostDetails() {
    const postsObservable = this.serverService.getPostDetails(this.id)
    postsObservable.subscribe((data ) => {
      data = Object.values(data)
      this.post = data[1]
      this.getUserID()
    })
  }

  getPostComments() {
    const commentsObservable = this.serverService.getPostComments(this.id)
    commentsObservable.subscribe((data ) => {
      data = Object.values(data)
      this.comments = data[1]
    })
  }

  getUserID() {
    if(this.serverService.loggedIn) {
      const idObservable = this.serverService.getUserID()
      idObservable.subscribe((data: any) => {
        if(!data.userID) {
          this.userID = 0
        }
        else {
          this.userID = data.userID
          this.checkIfUserOwnsPost(this.userID)
        }

      })
    }
    else {
      this.userID = 0
    }

  }

  checkIfUserOwnsPost(id: any) {
    if(this.post.userID == id) {
      this.userOwnsPost = true
    }
  }

  getUsername() {
    const userObservable = this.serverService.getUsernameFromID(this.id)
    userObservable.subscribe((data ) => {
      console.log("USERNAME")
      data = Object.values(data)
      console.log(data[0])
      this.username = data[0]
    })
  }

  deleteComment(commentID) {
    const delObservable = this.serverService.deleteComment({"commentID": commentID}, this.id)
    delObservable.subscribe((data ) => {
      window.location.reload()
    })


  }

  ngOnDestroy() {

  }
}
