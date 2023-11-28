import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {

  users : any = [];
  currentUser : any = {};

  constructor() { }

  firestore: AngularFirestore = inject(AngularFirestore);

  ngOnInit(){
  }

  getAllUsers() {
    return this.firestore.collection('/Users').snapshotChanges();
  }

  getCurrentUser(){
    this.currentUser = localStorage.getItem('currentUser');
    console.log('current user', this.currentUser);
    if(this.currentUser != null){
      //console.log('Current User is ', JSON.parse(this.currentUser));
      //let parsedcurrentUser = JSON.parse(this.currentUser);
      return JSON.parse(this.currentUser);
    }    
  }
}
