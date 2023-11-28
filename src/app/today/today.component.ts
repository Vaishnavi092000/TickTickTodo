import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { todo } from '../todo';
import { TodoCrudService } from '../Services/todoCrud/todo-crud.service';

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

      console.log('today', this.Todos);

      for(let to of this.Todos){
        if(to.name == undefined){
          //console.log('Todo name', to);
          this.Todos.splice(this.Todos.indexOf(to), 1);
          this.todoServ.deleteTodo(to);
        }
      }

      this.refreshTodos();

      console.log('TodayTodos', this.todayTodos);
    })
  }

  refreshTodos() {
    this.inboxTodo = [];
    this.todayTodos= [];

    for (let t of this.Todos) 
    {
      if (t.complete) {
        this.completeTodos.push(t);
      }
      else 
      {
        this.inboxTodo.push(t);
      }
    }

     
        for(let todo of this.inboxTodo){
        let formattedDate : any = this.datePipe.transform(this.today, 'MMM d');
        let a = formattedDate.toString();
        let b = todo.date.toString();
          if(a == b){
            console.log('this todo', todo);
            this.todayTodos.push(todo);
            console.log('today after push', this.todayTodos);
          }
        }

    console.log('inbox', this.inboxTodo);
  }

  editTodo(a:any, b:any){
    let newTodo: todo = {
      name : a.value,
      description : b.value,
      date : this.currentTodo.date,
      complete : this.currentTodo.complete
    };  
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
    //console.log('Toggle ', obj);
    this.todoServ.editTodo(obj, obj);
    this.refreshTodos();
    }, 300);
  }

}

