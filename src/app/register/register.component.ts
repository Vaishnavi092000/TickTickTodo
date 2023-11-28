import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthenticationService } from '../Services/firebaseCrud/firebase-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  registerUser!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    public fireAuth : FirebaseAuthenticationService,
    private router : Router
  ) { }

  ngOnInit() {
    let existingUser = localStorage.getItem('currentUser');
    if (existingUser != null || existingUser != undefined) {
      this.router.navigateByUrl('/nav/inbox');
    }
    
    this.registerUser = this.formBuilder.group(
      {
        userName: ['', Validators.required],
        userEmail: ['', [Validators.required, Validators.email]],
        userPhone: ['', Validators.required],
        userPass : ['', Validators.required],
        userconfPass : ['', Validators.required]
      },  
    );
  }

  Register(){
    let user = this.registerUser.value;
    this.fireAuth.signup(user.userEmail, user.userPass, user);
    this.router.navigateByUrl('/login');
  }

}
