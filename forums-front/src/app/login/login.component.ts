import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  public loginInvalid?: boolean;
  private formSubmitAttempt?: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.loginForm?.valid) {
      try {
        await this.authService.login(this.loginForm.value);
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
