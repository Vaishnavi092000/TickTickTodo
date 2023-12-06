import { Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
    private router : Router,
    private elementRef: ElementRef,
    private firestore: AngularFirestore,
  ) { }

  @ViewChild('fileInput') fileInput!: ElementRef;

  currentUser: any = {};
  isLoggedIn : boolean = false;
  userProfilePic = '';
  showDetails : boolean = false;

  password = '';
  passwordIsVisible = false;

  imgSrc = '';

  @ViewChild('bottomSheet') bottomSheet : ElementRef | undefined;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDetails = false;
    }
  }

  ngOnInit() {
    this.currentUser = this.usrCrud.getCurrentUser();
    //console.log('current user in profile', this.currentUser);

    if(Object.keys(this.currentUser).length != 0)
    {
      this.isLoggedIn = true;
    }

    if(this.currentUser.profile){
      this.imgSrc = this.currentUser.profile;
    }else{
      this.imgSrc = '../../assets/images/profile.png';
    }

    this.password = 'password';    
  }

  logout(){
    //console.log('Inside logout');
    this.firAuth.logout();
  }

  showOptions(){
    this.showDetails = !this.showDetails;
  }

  onFileSelected(event: any): void 
  {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      //console.log('Selected file:', selectedFile);
      // You can handle the selected file here (e.g., upload it to a server)
      const path = `UserProfiles/${selectedFile}`;
      let t = this.uploadServ.uploadFile(selectedFile, path);
      console.log('t', t);

      let user = {
        id : this.currentUser.id,
        name : this.currentUser.name,
        email : this.currentUser.email,
        isActive : this.currentUser.isActive,
        phone : this.currentUser.phone,
        todocollection : this.currentUser.todoCollection,
        password : this.currentUser.password, 
        profile : path
      }

      this.usrCrud.editCurrentUser(user);
      localStorage.removeItem('currentUser');
      localStorage.clear();
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log('Get Current User In Profile', this.currentUser);

    }
  }

  openFileInput(): void {
    // Trigger the click event on the file input element
    this.fileInput.nativeElement.click();
  }

  togglePass()
  {
    if (this.password === 'password') {
      this.password = 'text';
      this.passwordIsVisible = true;
    } else {
      this.password = 'password';
      this.passwordIsVisible = false;
    }
  }

  deleteProfile(){}

}



