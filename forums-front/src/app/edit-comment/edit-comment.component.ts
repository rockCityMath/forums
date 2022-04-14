import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ServerService } from '../shared/services/server-interface.service'
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {

  form!: FormGroup;
  public loginInvalid?: boolean;
  private formSubmitAttempt?: boolean;
  private id: any;
  public comment: any;


  constructor(private fb: FormBuilder, private authService: AuthService, private server: ServerService, private router: Router, private route: ActivatedRoute ) {
    route.params.subscribe(
      (params) => {
        this.id = params['id']
      });
    this.getCommentDetails();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      content: ['']
    });
  }

  async onSubmit() {
    if (!this.form?.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    const request = this.server.updateComment(
      {content: this.form.get('content')?.value},
      this.id
    );

    request.subscribe(() => {
      //SHOW SUCCESS HERE
      
      alert("Successfully updated!")
      this.router.navigate(['/post/' + this.comment.postID]);
    })
  }

  getCommentDetails() {
    const commentObservable = this.server.getComment(this.id)
    commentObservable.subscribe((data ) => {
      data = Object.values(data)
      this.comment = data[1][0]
      this.form = this.fb.group({
        content: [this.comment.content]
      });
      
    })
  }
}
