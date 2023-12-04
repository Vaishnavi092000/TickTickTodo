import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateFormsService } from '../Services/formValidations/validate-forms.service';
import { FirebaseAuthenticationService } from '../Services/firebaseCrud/firebase-authentication.service';
import { UserCrudService } from '../Services/userCrud/user-crud.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent  implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private formValid : ValidateFormsService,
    private fireAuth : FirebaseAuthenticationService,
    private usrCrud : UserCrudService
  ) { }

  resetUserPass!: FormGroup;

  userPass = '';
  newUserPass = '';
  newUserPassConf = '';

  invaliduserPass : String | undefined;
  invalidNewUserPass : String | undefined;
  invalidNewUserPassConf : String | undefined;

  isActive = false;

  ngOnInit() {
    this.resetUserPass = this.formBuilder.group(
      {
        userPass: ['', Validators.required],
        newUserPass: ['', Validators.required],
        newUserPassConf: ['', Validators.required],
      }
    );
  }

  validateCurrentPass(userPass : String){
    this.invaliduserPass = this.formValid.validateCurrentPass(userPass);
    this.reFreshBtnValid();
  }

  validateUserPass(newUserPass : String){
    this.invalidNewUserPass = this.formValid.validatePassword(newUserPass);
    this.reFreshBtnValid();
  }

  validateUserPassConf(newUserPass : String, newUserPassConf: String ){
    this.invalidNewUserPassConf = this.formValid.matchConfPassword(newUserPass, newUserPassConf);
    this.reFreshBtnValid();
  }

  reFreshBtnValid(){
    if((this.invaliduserPass =='') && (this.invalidNewUserPass =='') && (this.invalidNewUserPassConf ==''))
    {
      //console.log('Form is valid');
      this.isActive = true;
    }else{
      this.isActive = false;
      //console.log('Form is invalid');
    }
  }

  
  changePassword(){
    let currentUser = this.usrCrud.getCurrentUser();
    currentUser.password = this.newUserPassConf;
    console.log('inside change password', currentUser);
   this.fireAuth.updateCurrentUser(currentUser);
  }

}
