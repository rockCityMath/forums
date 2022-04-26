import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ServerService } from '../shared/services/server-interface.service'
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'
import { Input } from '@angular/core'

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {

  @Input() id: any

  editCommentForm!: FormGroup;
  public loginInvalid?: boolean;
  private formSubmitAttempt?: boolean;
  public comment: any;


  constructor(private fb: FormBuilder, private authService: AuthService, private server: ServerService, private router: Router, private route: ActivatedRoute ) {
    // route.params.subscribe(
    //   (params) => {
    //     this.id = params['id']
    //   });
    //this.getCommentDetails();
  }

  ngOnChanges():void {
    this.getCommentDetails();
    console.log("ID")
    console.log(this.id)
  }

  ngOnInit(): void {
    this.editCommentForm = this.fb.group({
      editCommentContent: ['']
    });
  }

  async onSubmit() {
    if (!this.editCommentForm?.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    const request = this.server.updateComment(
      {content: this.editCommentForm.get('editCommentContent')?.value},
      this.id
    );

    request.subscribe((data) => {
      //SHOW SUCCESS HERE

      alert("Successfully updated!")
      //this.router.navigate(['/post/' + this.comment.postID]);
      window.location.reload()
    })
  }

  getCommentDetails() {
    const commentObservable = this.server.getComment(this.id)
    commentObservable.subscribe((data ) => {
      data = Object.values(data)
      this.comment = data[1][0]
      this.editCommentForm = this.fb.group({
        editCommentContent: [this.comment.editCommentContent]
      });

    })
  }
}
