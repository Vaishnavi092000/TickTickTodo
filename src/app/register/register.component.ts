import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  registerUser!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
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
    console.log('Form : ', this.registerUser.value);
    let user = {};
    user = this.registerUser.value;
    console.log('user', user);
  }

}
