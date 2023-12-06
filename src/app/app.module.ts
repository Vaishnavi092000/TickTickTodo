import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BottomTabNavBarComponent } from './bottom-tab-nav-bar/bottom-tab-nav-bar.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TodayComponent } from './today/today.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule, MatIconModule } from './app-material.module';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule, DatePipe } from '@angular/common';
import { InboxComponent } from './inbox/inbox.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FilterPipe } from './Pipes/filterPipe/filter.pipe';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FirebaseAuthenticationService } from './Services/firebaseCrud/firebase-authentication.service';
import { ErrorHandlerService } from './Services/errorHandling/error-handler.service';
import { FileuploadService } from './Services/fileUpload/fileupload.service';
import { ValidateFormsService } from './Services/formValidations/validate-forms.service';
import { TodoCrudService } from './Services/todoCrud/todo-crud.service';
import { UserCrudService } from './Services/userCrud/user-crud.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    NavbarComponent,
    BottomTabNavBarComponent,
    AddTaskComponent,
    TodayComponent,
    InboxComponent,
    ProfileComponent,
    SearchComponent,
    WelcomeComponent,
    RegisterComponent,
    LoginComponent,
    FilterPipe, 
    AlertDialogComponent,
    ResetPasswordComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule, 
    AppMaterialModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    AngularFirestoreModule, 
    AngularFireModule.initializeApp(environment.firebase), 
    FormsModule, ReactiveFormsModule,
    MatExpansionModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule, 
       
],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FirebaseAuthenticationService, 
    ErrorHandlerService, 
    FileuploadService, 
    ValidateFormsService, 
    TodoCrudService, 
    UserCrudService, 
    AngularFireAuth,
    AngularFirestore,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
