import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { async } from 'rxjs';
import { UserCrudService } from '../Services/userCrud/user-crud.service';
import { FirebaseAuthenticationService } from '../Services/firebaseCrud/firebase-authentication.service';
import { Router } from '@angular/router';
import { FileuploadService } from '../Services/fileUpload/fileupload.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers : [FileuploadService],
})
export class ProfileComponent  implements OnInit {

  constructor(
    private usrCrud : UserCrudService, 
    private firAuth : FirebaseAuthenticationService,
    private uploadServ : FileuploadService,
    private router : Router
  ) { }

  firestore: AngularFirestore = inject(AngularFirestore);

  @ViewChild('fileInput') fileInput!: ElementRef;

  currentUser: any = {};
  isLoggedIn : boolean = false;
  userProfilePic = '';
  showDetails : boolean = false;


  ngOnInit() {
    this.currentUser = this.usrCrud.getCurrentUser();
    //console.log('current user in profile', this.currentUser);

    if(Object.keys(this.currentUser).length != 0)
    {
      this.isLoggedIn = true;
    }

    
  }

  logout(){
    console.log('Inside logout');
    this.firAuth.logout();
  }

  showOptions(){
    this.showDetails = !this.showDetails;
  }

  onFileSelected(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      console.log('Selected file:', selectedFile);
      // You can handle the selected file here (e.g., upload it to a server)
      const path = `test/${selectedFile}`;
      let t = this.uploadServ.uploadFile(selectedFile, path);
      console.log('t', t);
    }
  }

  openFileInput(): void {
    // Trigger the click event on the file input element
    this.fileInput.nativeElement.click();
  }

}



