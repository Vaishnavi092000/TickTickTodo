import { Injectable } from '@angular/core';
import { user } from 'src/app/user';
import { UserCrudService } from '../userCrud/user-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateFormsService {

  constructor(
    private usrCrud : UserCrudService
  ) { }

  ngOnInit(){}

  validateName(uname:String){
    console.log('inside validateName', uname);
    if(uname.match('^[a-zA-Z ]{2,30}$'))
    {
      return '';
    }else{
      return 'Invalid user name';
    }
  }

  validatePhone(userPhone:String){
    if(userPhone.match('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'))
    {
      return '';
    }else{
      return 'Invalid Phone Number';
    }
  }

  validateEmail(uemail : String){
    if(uemail.match('^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$')){
      return '';
    }else{
      return 'Invalid Email';
    }
  }

  validatePassword(userPass : String){
    if(userPass.
      match('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')){
      return '';
    }else{
      return 'Invalid Password';
    }
  }

  validateCurrentPass(userPass : String){
    let currentUser = this.usrCrud.getCurrentUser();
    if(currentUser.password == userPass)
    {
      return '';
    }else{
      return 'Please enter valid current password';
    }
  }

  matchConfPassword(userPass : String, userconfPass : String){
    if(userPass == userconfPass){
      return '';
    }else{
      return 'Password Does not match';
    }
  }

}
