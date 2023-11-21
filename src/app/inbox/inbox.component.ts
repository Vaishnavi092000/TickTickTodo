import { Component, OnInit, SimpleChanges, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TodoCrudService } from '../todo-crud.service';
import { todo } from '../todo';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent  implements OnInit {

  Todos : any = [];

  panelOpenState=false;

  constructor(private todoServ:TodoCrudService) { }

  firestore: AngularFirestore = inject(AngularFirestore);

  ngOnInit() {
    this.getTodo();
    console.log('Todos : ', this.Todos);
  }


  getTodo(){
    this.todoServ.getAllTodo().subscribe
    ((resp: any[]) => {
      resp.map((e:any) => {
        const data : any = e.payload.doc.data();
        data.id = e.payload.doc.id;
        this.Todos.push(data);
      })
    })
  }
}
