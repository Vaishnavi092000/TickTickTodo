import { Component, OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { async } from 'rxjs';
import { UserCrudService } from '../Services/userCrud/user-crud.service';
import { FirebaseAuthenticationService } from '../Services/firebaseCrud/firebase-authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {

  constructor(
    private usrCrud : UserCrudService, 
    private firAuth : FirebaseAuthenticationService,
    private router : Router
  ) { }

  firestore: AngularFirestore = inject(AngularFirestore);

  currentUser: any = {};
  isLoggedIn : boolean = false;

  ngOnInit() {
    this.currentUser = this.usrCrud.getCurrentUser();
    //console.log('current user in profile', this.currentUser);

    if(Object.keys(this.currentUser).length != 0)
    {
      this.isLoggedIn = true;
    }
  }

  logout(){
    this.firAuth.logout();
    this.router.navigateByUrl('/login');
  }

}



