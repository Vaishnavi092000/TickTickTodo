import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TodayComponent } from './today/today.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { CalendarComponent } from './calendar/calendar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { InboxComponent } from './inbox/inbox.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/splash', pathMatch: 'full' },
  { path: 'splash', component: SplashScreenComponent },
  { path : 'register', component : RegisterComponent },
  { path : 'login', component : LoginComponent },
  
  { path: 'nav', component: NavbarComponent, 
    children:[
      { path: 'today', component: TodayComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'search', component: SearchComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'inbox', component: InboxComponent },
      { path : 'resetPass', component : ResetPasswordComponent }
    ] 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
