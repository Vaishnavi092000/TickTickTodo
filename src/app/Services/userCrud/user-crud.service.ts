import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { user } from 'src/app/user';
import { FirebaseAuthenticationService } from '../firebaseCrud/firebase-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {

  users : any = [];
  currentUser : any = {};

  constructor( 
    public fireAuth : FirebaseAuthenticationService,
    public firestore: AngularFirestore

    ) { }

  ngOnInit(){
    //this.currentUser = localStorage.getItem('currentUser');
  }

  getAllUsers() {
    alert('inside get all users');
    return this.firestore.collection('/Users').snapshotChanges();
  }

  getCurrentUser(){
    this.currentUser = localStorage.getItem('currentUser');
    //console.log('current user', this.currentUser);
    if(this.currentUser != null){
      //console.log('Current User is ', JSON.parse(this.currentUser));
      //let parsedcurrentUser = JSON.parse(this.currentUser);
      return JSON.parse(this.currentUser);
    }  
    else{
      console.log('ksjdfh');
    } 
  }

  editCurrentUser(obj : user){
    this.deleteCurrentUser(obj);
    this.createUser(obj);
  }

  deleteCurrentUser(obj : user){
    this.currentUser = localStorage.getItem('currentUser');
    const docPath = '/Users/'+ obj.id;
    console.log('docpath', docPath);
    this.firestore.doc(docPath).delete();
  }

  createUser(user:any){
    this.firestore.collection('/Users').add(user);
  }
}
