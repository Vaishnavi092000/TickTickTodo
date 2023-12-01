import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthenticationService } from '../Services/firebaseCrud/firebase-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginUser!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public fireAuth: FirebaseAuthenticationService,
    private router: Router
  ) {

  }

  ngOnInit() {
    let existingUser = localStorage.getItem('currentUser');
    if (existingUser != null || existingUser != undefined) {
      this.router.navigateByUrl('/nav/inbox');
    }
    else {
      this.loginUser = this.formBuilder.group(
        {
          userEmail: ['', [Validators.required, Validators.email]],
          userPass: ['', Validators.required]
        }
      );
    }

  }

  Login() {

    let user = this.loginUser.value;
    try {
      this.fireAuth.signin(user.userEmail, user.userPass);
    } catch (e) {
      console.log('Login component error', e);
    }
    //this.router.navigateByUrl('nav/inbox');

    // setTimeout(()=>{
    //   // this.router.navigateByUrl('nav/inbox');
    // }, 4000);

  }

}
