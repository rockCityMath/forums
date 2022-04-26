import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ServerService } from '../shared/services/server-interface.service'
import { Router } from '@angular/router'
import {ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  commentForm!: FormGroup;
  private formSubmitAttempt?: boolean;
  id: any = ""

  constructor(private fb: FormBuilder, private authService: AuthService, private server: ServerService, private router: Router, private route: ActivatedRoute ) {
    route.params.subscribe(
      (params) => {
        this.id = params['id']
      });

  }

  ngOnInit(): void {
  this.commentForm = this.fb.group({
    commentContent: ['']
  });
  }

  async onSubmit() {
    console.log('Submitting');
    if (!this.commentForm?.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    if(!this.server.loggedIn) {
      alert("You must be logged in to leave a reply!")
      this.router.navigate(['/post/' + this.id]);
      return
    }

    const request = this.server.addReply({
      content: this.commentForm.get('commentContent')?.value
    }, this.id );

    request.subscribe(() => {
      alert("Successfully posted!")
      this.router.navigate(['/post/' + this.id]);
    })
  }
}
