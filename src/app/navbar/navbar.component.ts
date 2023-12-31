import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { TodoCrudService } from '../Services/todoCrud/todo-crud.service';
//import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers : [DatePipe, TodoCrudService]
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

      for(let to of this.Todos){
        if(to.name == undefined){
          //console.log('Todo name', to);
          this.todoServ.deleteTodo(to);
          this.Todos.splice(this.Todos.indexOf(to), 1);
        }
      }


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
        let a = formattedDate.toString();
        let b = t.date.toString();
        if(a == b){
          this.todayCount++;
        }

        this.inboxTodo.push(t);
      }
    }
  }
}
