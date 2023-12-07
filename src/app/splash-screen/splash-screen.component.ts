import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCrudService } from '../Services/userCrud/user-crud.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  providers : [UserCrudService]
})
export class SplashScreenComponent  implements OnInit {

  constructor(private router: Router, private usrCrud : UserCrudService) { }

  currentUser: any = {};

  ngOnInit() {}

  redirect() {
    this.currentUser = this.usrCrud.getCurrentUser();
    //console.log('current user in profile', this.currentUser);

    if(this.currentUser != undefined || this.currentUser != null)
    {
      this.router.navigateByUrl('/nav');
    }
    else {
      this.router.navigateByUrl('/login');
    }   
  }

}
