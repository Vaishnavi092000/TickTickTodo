import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthenticationService } from '../Services/firebaseCrud/firebase-authentication.service';
import { Router } from '@angular/router';
import { ValidateFormsService } from '../Services/formValidations/validate-forms.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers : [FirebaseAuthenticationService, ValidateFormsService]
})
export class LoginComponent implements OnInit {

  loginUser!: FormGroup;

  password = '';
  
  userEmail = '';
  userPass = '';

  invaliduserEmail : String | undefined;
  invaliduserPass : String | undefined;

  isActive = false;
  passwordIsVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    public fireAuth: FirebaseAuthenticationService,
    private router: Router,
    private formValid : ValidateFormsService
  ) { }

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

    this.password = 'password';

  }

  Login() {

    console.log('inside login');
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

  validateUserEmail(userEmail : String){
    this.invaliduserEmail = this.formValid.validateEmail(userEmail);
    this.reFreshBtnValid();
  }

  validateUserPass(userPass : String){
    this.invaliduserPass = this.formValid.validatePassword(userPass);
    this.reFreshBtnValid();
  }

  reFreshBtnValid(){
    if((this.invaliduserEmail =='') && (this.invaliduserPass ==''))
    {
      //console.log('Form is valid');
      this.isActive = true;
    }else{
      this.isActive = false;
      //console.log('Form is invalid');
    }
  }

  togglePass(){
    if (this.password === 'password') {
      this.password = 'text';
      this.passwordIsVisible = true;
    } else {
      this.password = 'password';
      this.passwordIsVisible = false;
    }
  }

}
