import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TodoCrudService } from '../todo-crud.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers : [DatePipe]
})
export class NavbarComponent  implements OnInit {

  Todos:any=[];
  completeTodos:any=[];
  inboxTodo : any = [];
  today = new Date();
  todayCount :number =0;

  constructor(
    public dialog: MatDialog, 
    private todoServ: TodoCrudService,
    private datePipe: DatePipe
  ) { }

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
    this.completeTodos = [];
    this.inboxTodo = [];
    this.todayCount=0;

    for(let t of this.Todos){
      console.log(t);
      if(t.complete){
        this.completeTodos.push(t);
      }
      else{
       let formattedDate : any = this.datePipe.transform(this.today, 'MMM d');
        console.log('date', t.date.toString());
        console.log('today', formattedDate.toString());
        
        let a = formattedDate.toString();
        let b = t.date.toString();
        if(a == b){
          this.todayCount++;
          console.log('done');
        }

        this.inboxTodo.push(t);
      }
    }
  }
}
