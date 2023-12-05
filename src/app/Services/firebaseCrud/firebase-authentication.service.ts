import { Injectable, inject } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserCrudService } from '../userCrud/user-crud.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import * as firebase from 'firebase/compat';
import { user } from 'src/app/user';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {

  users: any[] = [];

  constructor(
    public firebaseAuth: AngularFireAuth, 
    private userCrudServ: UserCrudService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  currentUser: any = {};
  errorMsg = '';

  firestore: AngularFirestore = inject(AngularFirestore);

  

  async signin(email: string, password: string) {
    //console.log('inside sign in');
    try {
      await this.firebaseAuth.signInWithEmailAndPassword(email, password)
        .then(
          resp => {
            try {
              this.getUser(email, password);
              //this.router.navigateByUrl('nav/inbox');
            } catch (e) {
              console.log(e);
            }
          }
        )
        .catch(e => {
          //console.log('inside sigin error');

          this.dialog.open(AlertDialogComponent, {
            data: {
              //icon: 'Check',
              message: 'Invalid user credentials'
            }
          });

          throw new Error('Invalid user credentials');
        });

    }
    catch (err) {
      //console.log('Error Msg Firebase Auth', err);

      // this.dialog.open(AlertDialogComponent, {
      //   data: {
      //     //icon: 'Check',
      //     message: 'Error Msg Firebase Auth'
      //   }
      // });

      throw new Error('Error Msg Firebase Auth');
    }
  }

  async signup(email: string, password: string, localU: any) {
    try{
      await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(
        resp => {
          try{
            this.firestore.collection('/Users').add({
              'id': resp.user?.uid,
              'name': localU.userName,
              'email': localU.userEmail,
              'phone': localU.userPhone,
              'password': localU.userPass,
              'isActive': false,
              'todoCollection': 'Todos' + resp.user?.uid
            })
  
            let todoCollectionName = 'Todos' + resp.user?.uid;
  
            this.firestore.collection('/' + todoCollectionName).add({});
          }catch(e){
            console.log(e);
          }
        }
      )
      .catch(e => {
        //console.log('inside sigin error');

        this.dialog.open(AlertDialogComponent, {
          data: {
            //icon: 'Check',
            message: 'Unable to register the user'
          }
        });

        throw new Error('Unable to register the user');
      });

    }catch(err){
      throw new Error('Error Msg Firebase Auth For Register');
    }
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('currentUser');
    localStorage.clear();
    //console.log(localStorage.getItem('currentUser'));

    setTimeout(
      ()=>{
      this.router.navigateByUrl('/login')
    }, 3000);
  }

  async updateCurrentUser(newUser : any) : Promise<void>{
    // this.currentuser = this.userCrudServ.getCurrentUser();
    // console.log('newUser', newUser);
    // //console.log('val of newUser', JSON.parse(newUser));

    // // await this.firebaseAuth.updateCurrentUser(newUser)
    // // .then(()=>{
    // //   console.log('Updated');
    // // });

    // this.currentuser.updateCurrentUser(newUser);
    console.log('inside updateCurrentUser', newUser);

    try{

    }catch(e){

    }
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

  getUser(email: string, pass: string) {
    //console.log('inside getUser');

    this.userCrudServ.getAllUsers().subscribe
      (res => {
        res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          this.users.push(data);
          //console.log('dta', data);
          if (data.email == email && data.password == pass) {
            this.currentUser = data;
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            console.log('Current user is set into firebase auth', localStorage.getItem('currentUser'));
            this.router.navigateByUrl('nav/inbox');
          }
        })
      })
  }

}
