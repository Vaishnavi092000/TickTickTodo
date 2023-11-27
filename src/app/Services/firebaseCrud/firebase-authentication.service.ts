import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { UserCrudService } from '../userCrud/user-crud.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {

  users:any [] = [];

  constructor(
    public firebaseAuth: AngularFireAuth,
    private userCrudServ: UserCrudService
  ) { }

  currentuser: any= {};

  firestore: AngularFirestore = inject(AngularFirestore);

  async signin(email: string, password: string) {
    //console.log('inside sign in');
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
          this.firestore.collection('/Users').add({
            'id': resp.user?.uid,
            'name': localU.userName,
            'email': localU.userEmail,
            'phone': localU.userPhone,
            'password': localU.userPass,
            'isActive': false,
            'todoCollection' : 'Todos'+resp.user?.uid
          })

          let todoCollectionName = 'Todos'+resp.user?.uid;
          todoCollectionName.concat
          console.log(todoCollectionName);

          this.firestore.collection('/'+todoCollectionName).add({});
        }
      )
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('currentUser');
  }

  // getUsers() {
  //   this.userCrudServ.getAllUsers().subscribe
  //   (res => {
  //     res.map((e:any) => {
  //       const data = e.payload.doc.data();
  //       data.id = e.payload.doc.id;
  //       this.users.push(data);
  //     })
  //   })
  // }  

  getUser(email: string, pass: string) 
  {
    this.userCrudServ.getAllUsers().subscribe
    (res => {
      res.map((e:any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        this.users.push(data);
        if(data.email == email && data.password == pass)
        {
          this.currentuser = data;
          //console.log('Current User : ', this.currentuser);
          localStorage.setItem('currentUser', JSON.stringify(this.currentuser));
        }
      })
    })
  }
}
