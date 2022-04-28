import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ServerService } from '../shared/services/server-interface.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {
  composeForm!: FormGroup;
  public loginInvalid?: boolean;
  private formSubmitAttempt?: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService, private server: ServerService, private router: Router ) { }

  ngOnInit(): void {
    this.composeForm = this.fb.group({
      composeTitle: [''],
      composeContent: [''],
      composeTags: ['']
    });
  }

  async onSubmit() {
    console.log('Submitting');
    if (!this.composeForm?.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    const request = this.server.createPost({
      title: this.composeForm.get('composeTitle')?.value,
      content: this.composeForm.get('composeContent')?.value,
      //TODO: Parse these tags
      tags: this.composeForm.get('composeTags')?.value
    });

    request.subscribe(() => {
      //SHOW SUCCESS HERE

      alert("Successfully posted!")
      window.location.reload()
    })
  }
}
