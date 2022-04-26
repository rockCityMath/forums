import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ServerService } from '../shared/services/server-interface.service'
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'
import { Input } from '@angular/core'

@Component({
  selector: 'app-edit-bio',
  templateUrl: './edit-bio.component.html',
  styleUrls: ['./edit-bio.component.scss']
})
export class EditBioComponent implements OnInit {

  @Input() userID: string = '';

  editBioForm!: FormGroup;
  public loginInvalid?: boolean;
  private formSubmitAttempt?: boolean;
  username: any = 'null'
  isAdmin: Boolean = false
  public user: any

  constructor(private fb: FormBuilder, private authService: AuthService, private server: ServerService, private router: Router, private route: ActivatedRoute ) {    
    // route.params.subscribe(
    //   // (params) => {
    //   //   this.userID = params['id']
    //   // });

    
  }


  ngOnChanges(): void {
    // this.getUserDetails();

    this.editBioForm = this.fb.group({
      editBioContent: [''],
    });

    // this.authService.isLoggedIn.subscribe(data => {
    //   if(data) {
    //     const nameObservable = this.server.getUsernameFromID()
    //     nameObservable.subscribe((data ) => {
    //       console.log(data)
    //       data = Object.values(data)
    //       this.username = data[0]
    //       this.isAdmin = data[1]
    //     })
    //     const idObservable = this.server.getUserID()
    //     idObservable.subscribe((data: any) => {
    //       this.userID = data.userID
    //     })
    //   }
    // })
  }

  ngOnInit(): void {


    this.editBioForm = this.fb.group({
      editBioContent: [''],
    });

    this.authService.isLoggedIn.subscribe(data => {
      if(data) {
        const nameObservable = this.server.getUsernameFromID()
        nameObservable.subscribe((data ) => {
          console.log(data)
          data = Object.values(data)
          this.username = data[0]
          this.isAdmin = data[1]
        })
        const idObservable = this.server.getUserID()
        idObservable.subscribe((data: any) => {
          this.userID = data.userID
        })
      }
    })
  }

  async onSubmit() {
    console.log('Submitting');
    if (!this.editBioForm?.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    console.log("VALUE")
    console.log(this.editBioForm.get('editBioContent')?.value)

    const request = this.server.updateUser(
      {biography: this.editBioForm.get('editBioContent')?.value},
      this.userID
      );

    request.subscribe((data) => {
      console.log("DATA")
      console.log(data)
      alert("Successfully updated biography!")
      //this.router.navigate(['/user/' + this.userID]);
      window.location.reload()
    })
  }

  getUserDetails() {
    const userObservable = this.server.getUser(this.userID)
    userObservable.subscribe((data ) => {
      data = Object.values(data)
      this.user = data[1]
      this.editBioForm = this.fb.group({
        biography: ['']
      });
    })
  }
}
