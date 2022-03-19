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
  form!: FormGroup;
  private formSubmitAttempt?: boolean;
  id: any = ""

  constructor(private fb: FormBuilder, private authService: AuthService, private server: ServerService, private router: Router, private route: ActivatedRoute ) { 
    route.params.subscribe(
      (params) => {
        this.id = params['id']
      });
  }

  ngOnInit(): void {
  this.form = this.fb.group({
    content: ['']
  });
  }

  async onSubmit() {
    console.log('Submitting');
    if (!this.form?.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    const request = this.server.addReply({
      content: this.form.get('content')?.value
    }, this.id );

    request.subscribe(() => {
      alert("Successfully posted!")
      this.router.navigate(['/post/' + this.id]);
    })
  }
}
