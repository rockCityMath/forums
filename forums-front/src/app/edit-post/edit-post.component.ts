import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ServerService } from '../shared/services/server-interface.service'
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  editPostForm!: FormGroup;
  public loginInvalid?: boolean;
  private formSubmitAttempt?: boolean;
  private id: any;
  public post: any;


  constructor(private fb: FormBuilder, private authService: AuthService, private server: ServerService, private router: Router, private route: ActivatedRoute ) {
    route.params.subscribe(
      (params) => {
        this.id = params['id']
      });
    this.getPostDetails();
  }

  ngOnInit(): void {
    this.editPostForm = this.fb.group({
      editPostContent: ['']
    });
  }

  async onSubmit() {
    if (!this.editPostForm?.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    const request = this.server.updatePost(
      {content: this.editPostForm.get('editPostContent')?.value},
      this.id
    );

    request.subscribe(() => {
      //SHOW SUCCESS HERE

      alert("Successfully updated!")
      this.router.navigate(['/post/' + this.post._id]);
    })
  }

  getPostDetails() {
    const postsObservable = this.server.getPostDetails(this.id)
    postsObservable.subscribe((data ) => {
      data = Object.values(data)
      this.post = data[1]
      this.editPostForm = this.fb.group({
        editPostContent: [this.post.editPostContent]
      });
    })
  }
}
