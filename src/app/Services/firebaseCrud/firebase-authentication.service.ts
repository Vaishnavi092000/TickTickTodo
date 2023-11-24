import { JsonPipe } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { user } from '../../user';
import { UserCrudService } from '../userCrud/user-crud.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {

  constructor(
    public firebaseAuth: AngularFireAuth,
    private userCrudServ: UserCrudService
  ) { }

  users: any[] = [];
  currentuser: any = {};

  firestore: AngularFirestore = inject(AngularFirestore);

  async signin(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(
      resp => {
        this.getUser(email, password);
      }
    )
  }

  async signup(email: string, password: string, localU: any) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(
        resp => {
          localStorage.setItem('user', JSON.stringify(resp.user));
          this.firestore.collection('/Users').add({
            'id': resp.user?.uid,
            'name': localU.userName,
            'email': localU.userEmail,
            'phone': localU.userPhone,
            'password': localU.userPass,
            'isActive': false
          })
        }
      )
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

  getUsers() {
    this.userCrudServ.getAllUsers().subscribe(res => {
      res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        this.users.push(data);
      });
    })
  }

  getUser(email: string, pass: string) {
    this.getUsers();
    for (let u of this.users) {
      if (u.email == email && u.password == pass) {
        this.currentuser = u;
      }
    }
    return this.currentuser;
  }
}
