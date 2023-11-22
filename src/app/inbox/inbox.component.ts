import { Component,OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TodoCrudService } from '../todo-crud.service';
import { todo } from '../todo';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit {

  Todos:any=[];
  
  completeTodos:any=[];
  inboxTodo : any = [];

  constructor(private todoServ: TodoCrudService) { }

  firestore: AngularFirestore = inject(AngularFirestore);


  ngOnInit() {
    this.getTodo();
  }

  getTodo(){
    this.todoServ.getAllTodo().subscribe(res=>{
      this.Todos = res.map((e:any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      }); 

      this.refreshTodos();
    })
  }

  deleteTodo(){
    console.log('inside delete');
  }

  editTodo(){
    console.log('inside edit');
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

    console.log('completed', this.completeTodos);
  }

  toggleComplete(obj:todo){
    obj.complete = !obj.complete;
    console.log('Toggle ', obj);
    this.todoServ.editTodo(obj);
    this.refreshTodos();
  }
}
