import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BottomTabNavBarComponent } from './bottom-tab-nav-bar/bottom-tab-nav-bar.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TodayComponent } from './today/today.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox/inbox.component';
import { AddTaskBottomSheetComponent } from './add-task-bottom-sheet/add-task-bottom-sheet.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent, 
    SplashScreenComponent,
    NavbarComponent,
    BottomTabNavBarComponent,
    AddTaskComponent,
    TodayComponent,
    InboxComponent,
    AddTaskBottomSheetComponent,
    CalendarComponent,
    ProfileComponent,
    SearchComponent,
    WelcomeComponent,
    RegisterComponent,
    LoginComponent
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
    CommonModule
],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
