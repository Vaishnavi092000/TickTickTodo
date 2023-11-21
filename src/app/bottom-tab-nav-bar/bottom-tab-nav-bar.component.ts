import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-tab-nav-bar',
  templateUrl: './bottom-tab-nav-bar.component.html',
  styleUrls: ['./bottom-tab-nav-bar.component.scss'],
})
export class BottomTabNavBarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  showTask = true;
  showCalandar = false;
  search = false;
  profile = false;

  showTasks() {
    this.showTask = true;
    this.showCalandar = false;
    this.search = false;
    this.profile = false;
  }

  showCalandars() {
    this.showCalandar = true;
    this.showTask = false;
    this.search = false;
    this.profile = false;
  }

  searchText() {
    this.search = true;
    this.profile = false;
    this.showCalandar = false;
    this.showTask = false;
  }

  showProfile() {
    this.profile = true;
    this.search = false;
    this.showCalandar = false;
    this.showTask = false;
  }

}
