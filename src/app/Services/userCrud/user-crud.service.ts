import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {

  users : any = [];
  currentuser : any = {};

  constructor() { }

  firestore: AngularFirestore = inject(AngularFirestore);

  ngOnInit(){
  }

  getAllUsers() {
    return this.firestore.collection('/Users').snapshotChanges();
  }

}
