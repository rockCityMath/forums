import { getSafePropertyAccessString, ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ServerService } from '../shared/services/server-interface.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  editPostForm!: FormGroup;
  post: any;
  id: any = []
  comments: any = [];
  userID = 0
  userOwnsPost = false
  username? = ''
  selectedCommentID = ''
  selectedPostID = ''

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private serverService: ServerService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getPostDetails()
    this.getPostComments()
    this.selectedPostID = ''
    this.editPostForm = this.fb.group({
      editPostContent: ['']
    });
    this.getUserID()
    //this.getUsername()
  }

  getPostDetails() {
    const postsObservable = this.serverService.getPostDetails(this.id)
    postsObservable.subscribe((data ) => {
      data = Object.values(data)
      this.post = data
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
          this.checkIfUserOwnsPost()
        }

      })
    }
    else {
      this.userID = 0
    }
    //console.log(this.userID)

  }

  checkIfUserOwnsPost() {
    console.log(this.post[1].userID)
    if(this.post[1].userID == this.userID) {
      this.userOwnsPost = true
    }

  }

  async editPostSubmit() {

    if (!this.editPostForm?.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    const request = this.serverService.updatePost(
      {content: this.editPostForm.get('editPostContent')?.value},
      this.selectedPostID
    );

    request.subscribe(() => {
      //SHOW SUCCESS HERE
      //alert(this.selectedPostID)
      alert("Successfully updated!")
      window.location.reload()
    })
  }

  deleteComment(commentID) {
    const delObservable = this.serverService.deleteComment({"commentID": commentID}, this.id)
    delObservable.subscribe((data ) => {
      window.location.reload()
    })


  }

  deletePost(id:any) {
    const postsObservable = this.serverService.deletePost(id)
    postsObservable.subscribe((data) => {
      data = Object.values(data)
      this.post = data
      //this.getUserPosts()
      this.router.navigate(['/home']);
    })
  }

  ngOnDestroy() {

  }
}
