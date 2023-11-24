import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  loginUser!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginUser = this.formBuilder.group(
      {
        userEmail: ['', [Validators.required, Validators.email]],
        userPass : ['', Validators.required]
      },
  
    );
  }

  Login(){
    console.log('Form : ', this.loginUser.value);
    let user = {};
    user = this.loginUser.value;
    console.log('user', user);
    
  }

}
