import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../shared/services/server-interface.service'
import { AuthService } from '../shared/services/auth.service';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {


  form!: FormGroup;
  public loginInvalid?: boolean;
  private formSubmitAttempt?: boolean;

  constructor(
    private fb: FormBuilder,
    private server: ServerService,
    private router: Router,
    private authService: AuthService
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

      this.ifReg();

      //alert("Successfully registered acount. Please sign in below!")
      //this.router.navigate(['/login']);
    })

  }

  async ifReg() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form?.valid) {
      try {
       await this.authService.login(this.form.value);
       return true;
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}
