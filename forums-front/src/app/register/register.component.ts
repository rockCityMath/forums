import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../server-interface.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  
  /*
  constructor() { }

  ngOnInit(): void {
  }
  */
  
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private server: ServerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: [''],
      password: ['']
    },);
  }

  onSubmit() {
    console.log('Submitting');
    if (!this.form?.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    const request = this.server.request('POST', '/auth/register', {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value
    });

    request.subscribe(() => {
      //SHOW SUCCESS HERE
      
      this.router.navigate(['/login']);
    })
  }
  
}