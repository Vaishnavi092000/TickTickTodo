import { Component, OnInit } from '@angular/core';
import { TodoCrudService } from '../todo-crud.service';
import { DatePipe } from '@angular/common';
import { todo } from '../todo';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {

  constructor(private todoServ: TodoCrudService, private datePipe: DatePipe) { }

  Todos: any = [];
  inboxTodo: any = [];
  todayTodos: any = [];
  today = new Date();
  isEditable : boolean = false;
  showDetails : boolean = false;
  completeTodos:any=[];

  currentTodo : todo = {
    name: 'String',
    description: 'String',
    date: undefined,
    complete: false
  };


  ngOnInit() {
    this.getTodo();
  }

  getTodo() {
    this.todoServ.getAllTodo().subscribe(res => {
      this.Todos = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });

      this.refreshTodos();
    })
  }

  refreshTodos() {
    this.inboxTodo = [];
    this.todayTodos= [];

    for (let t of this.Todos) {
      if (t.complete) {
        this.completeTodos.push(t);
      }
      else 
      {
        this.inboxTodo.push(t);
        let formattedDate : any = this.datePipe.transform(this.today, 'MMM d');
        let a = formattedDate.toString();
        let b = t.date.toString();
        for(let todo of this.inboxTodo){
          if(a == b){
            this.todayTodos.push(todo);
          }
        }
      }
    }
  }

  editTodo(a:any, b:any){
    let newTodo: todo = {
      name : a.value,
      description : b.value,
      date : this.currentTodo.date,
      complete : this.currentTodo.complete
    };  

    console.log('newtodo for editing', newTodo);

    this.todoServ.editTodo(this.currentTodo, newTodo);

    this.showDetails = false;
  }

  deleteTodo(obj : todo){
    this.todoServ.deleteTodo(obj);
    this.showDetails = false;
  }

  openTaskDetails(obj : todo){
    this.currentTodo = obj;
    this.showDetails = !this.showDetails;
  }

  toggleComplete(obj:todo){
    setTimeout(() => {
      obj.complete = !obj.complete;
    console.log('Toggle ', obj);
    this.todoServ.editTodo(obj, obj);
    this.refreshTodos();
    }, 300);
  }

}

