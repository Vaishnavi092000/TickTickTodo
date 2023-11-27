import { Component } from '@angular/core';
import { UserCrudService } from './Services/userCrud/user-crud.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private usrCrud : UserCrudService) {}

  ngOnInit(){
    this.usrCrud.getCurrentUser();
  }

  
}
