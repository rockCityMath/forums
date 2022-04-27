import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  commentForm!: FormGroup;
  private formSubmitAttempt?: boolean;

  constructor(private fb: FormBuilder, private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
    this.getMostRecent();
    this.getMostLiked();
    this.commentForm = this.fb.group({
      commentContent: ['']
    });
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

  async commentSubmit() {
    console.log('Submitting');
    if (!this.commentForm?.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    if(!this.serverService.loggedIn) {
      alert("You must be logged in to leave a reply!")
      //this.router.navigate(['/post/' + this.userID]);
      return
    }

    const request = this.serverService.addReply({
      content: this.commentForm.get('commentContent')?.value
    }, this.postID );

    request.subscribe(() => {
      alert("Successfully posted!")
      //this.router.navigate(['/post/' + this.id]);
      window.location.reload()
    })
  }
}
