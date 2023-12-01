import { Component, OnInit } from '@angular/core';
import { TodoCrudService } from '../Services/todoCrud/todo-crud.service';
import { todo } from '../todo';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent  implements OnInit {

  constructor(private todoServ: TodoCrudService) { }

  Todos:any=[];
  isEditable : boolean = false;
  showDetails : boolean = false;
  searchText = '';
  currentTodo : todo = {
    name: 'String',
    description: 'String',
    date: undefined,
    complete: false
  };



  ngOnInit() {
    this.getTodos();
  }

  getTodos(){
    this.todoServ.getAllTodo().subscribe(res=>{
      this.Todos = res.map((e:any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
        
      for(let to of this.Todos){
        if(to.name == undefined){
          //console.log('Todo name', to);
          this.deleteTodo(to);
          this.Todos.splice(this.Todos.indexOf(to), 1);
        }
      }
      //this.refreshTodos();
    })
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

}
