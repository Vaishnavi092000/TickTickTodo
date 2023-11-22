import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TodoCrudService } from '../todo-crud.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  Todos:any=[];
  completeTodos:any=[];
  inboxTodo : any = [];

  constructor(public dialog: MatDialog, private todoServ: TodoCrudService) { }

  firestore: AngularFirestore = inject(AngularFirestore);

  ngOnInit() {
    this.getTodo();
  }

  getTodo(){
    this.todoServ.getAllTodo().subscribe((res : any)=>{
      this.Todos = res.map((e:any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      }); 

      this.refreshTodos();
    })
  }

  refreshTodos(){
    console.log('inside refresh');
    this.completeTodos = [];
    this.inboxTodo = [];

    for(let t of this.Todos){
      console.log(t);
      if(t.complete){
        this.completeTodos.push(t);
      }
      else{
        this.inboxTodo.push(t);
      }
    }
  }
}
