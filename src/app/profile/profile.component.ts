import { Component, OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { async } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {

  constructor() { }

  firestore: AngularFirestore = inject(AngularFirestore);

  ngOnInit() {
    this.firestore.collection('/Users').add({
      name : 'Veda'
    });
    console.log('created');
  }

}



