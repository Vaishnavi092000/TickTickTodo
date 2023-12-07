import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { user } from 'src/app/user';
import { FirebaseAuthenticationService } from '../firebaseCrud/firebase-authentication.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {

  users : any = [];
  currentUser : any = {};

  constructor( 
    public fireAuth : FirebaseAuthenticationService,
    public firestore: AngularFirestore,
    //private firebaseAuth: AngularFireAuth,
    ) { }

  ngOnInit(){
    //this.currentUser = localStorage.getItem('currentUser');
  }

  getAllUsers() {
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
      //console.log('ksjdfh');
    } 
  }

  editCurrentUser(obj : user){
    this.currentUser = localStorage.getItem('currentUser');
    this.deleteCurrentUser(this.currentUser);
    this.createUser(obj);
  }

  deleteCurrentUser(obj : user){
    this.currentUser = localStorage.getItem('currentUser');
    const docPath = '/Users/'+ obj.id;
    //console.log('docpath', docPath);
    this.firestore.doc(docPath).delete();
  }

  createUser(user:any){
    console.log('Creating new user', user);
    this.firestore.collection('/Users').add(user);
    let todoCollectionName = 'Todos' + user.todoCollection;
    this.firestore.collection('/' + todoCollectionName).add({});
  }
}
