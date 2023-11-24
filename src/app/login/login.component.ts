import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthenticationService } from '../Services/firebaseCrud/firebase-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  loginUser!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    public fireAuth : FirebaseAuthenticationService,
    private router : Router
  ) { }

  ngOnInit() 
  {
    this.loginUser = this.formBuilder.group(
      {
        userEmail: ['', [Validators.required, Validators.email]],
        userPass : ['', Validators.required]
      }
    );
  }

  Login(){
    let user = this.loginUser.value;
    this.fireAuth.signin(user.userEmail, user.userPass); 
    this.router.navigateByUrl('nav/inbox');
  }

}
