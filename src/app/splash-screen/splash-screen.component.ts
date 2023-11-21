import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  redirect() {
    // setTimeout(() => {
    //   this.router.navigateByUrl('/dash');
    // }, 5000);

    this.router.navigateByUrl('/nav');
  }

}
