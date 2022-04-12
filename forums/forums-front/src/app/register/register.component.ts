import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../shared/services/server-interface.service'

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

    const request = this.server.register({
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value
    });

    request.subscribe((data) => {
      //SHOW SUCCESS HERE

      console.log(data)
      
      alert("Successfully registered acount. Please sign in below!")
      this.router.navigate(['/login']);
    })
  }
  
}