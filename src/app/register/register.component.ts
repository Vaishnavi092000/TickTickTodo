import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthenticationService } from '../Services/firebaseCrud/firebase-authentication.service';
import { Router } from '@angular/router';
import { ValidateFormsService } from '../Services/formValidations/validate-forms.service';
//import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers : [FirebaseAuthenticationService, ValidateFormsService]
})
export class RegisterComponent  implements OnInit {

  registerUser!: FormGroup;
  userName = '';
  userEmail = '';
  userPhone = '';
  userPass = '';
  userconfPass = '';

  invaliduserName : String | undefined;
  invaliduserEmail : String | undefined;
  invaliduserPhone : String | undefined;
  invaliduserPass : String | undefined;
  invaliduserconfPass : String | undefined;

  isActive = false;
  passwordIsVisible = false;

  password = '';

  constructor(
    private formBuilder: FormBuilder, 
    public fireAuth : FirebaseAuthenticationService,
    private router : Router,
    private formValid : ValidateFormsService
  ) { }

  ngOnInit() 
  {
    let existingUser = localStorage.getItem('currentUser');
    if (existingUser != null || existingUser != undefined) {
      this.router.navigateByUrl('/nav/inbox');
    }
    
    this.registerUser = this.formBuilder.group(
      {
        userName: ['', Validators.required],
        userEmail: ['', Validators.required],
        userPhone: ['', Validators.required],
        userPass : ['', Validators.required],
        userconfPass : ['', Validators.required]
      },  
    );

    this.password = 'password';
   
  }

  Register()
  {
    let user = this.registerUser.value;
    try{
      this.fireAuth.signup(user.userEmail, user.userPass, user);
      this.router.navigateByUrl('/login');

    }catch(e){
      console.log('Register Error');
    }
  }

  validateUserName(userName : String){
    this.invaliduserName = this.formValid.validateName(userName);
    this.reFreshBtnValid();
  }

  validateUserEmail(userEmail : String){
    this.invaliduserEmail = this.formValid.validateEmail(userEmail);
    this.reFreshBtnValid();
  }

  validateUserPhone(userPhone : String){
    this.invaliduserPhone = this.formValid.validatePhone(userPhone);
    this.reFreshBtnValid();
  }

  validateUserPass(userPass : String){
    this.invaliduserPass = this.formValid.validatePassword(userPass);
    this.reFreshBtnValid();
  }

  validateUserconfPass(userPass : String, userconfPass : String){
    this.invaliduserconfPass = this.formValid.matchConfPassword(userPass, userconfPass);
    this.reFreshBtnValid();
  }

  reFreshBtnValid(){
    if((this.invaliduserName == '') && (this.invaliduserEmail =='') && (this.invaliduserPhone =='') && (this.invaliduserPass =='') && (this.invaliduserconfPass ==''))
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