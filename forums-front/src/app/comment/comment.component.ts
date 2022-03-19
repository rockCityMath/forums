import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ServerService } from '../shared/services/server-interface.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  form!: FormGroup;
  public loginInvalid?: boolean;
  private formSubmitAttempt?: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService, private server: ServerService, private router: Router ) { }

  ngOnInit(): void {
  this.form = this.fb.group({
    title: [''],
    content: [''],
    tags: ['']
  });
  }

  async onSubmit() {
    console.log('Submitting');
    if (!this.form?.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    const request = this.server.createPost({
      title: this.form.get('title')?.value,
      content: this.form.get('content')?.value,
      //TODO: Parse these tags
      tags: this.form.get('tags')?.value
    });

    request.subscribe(() => {
      //SHOW SUCCESS HERE

      alert("Successfully posted!")
      this.router.navigate(['/home']);
    })
  }
}
