import { Component,ElementRef,HostListener,OnInit, ViewChild } from '@angular/core';
import { todo } from '../todo';
import { TodoCrudService } from '../Services/todoCrud/todo-crud.service';
import { FirebaseAuthenticationService } from '../Services/firebaseCrud/firebase-authentication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  providers : [TodoCrudService, FirebaseAuthenticationService, AngularFireAuth]
})
export class InboxComponent implements OnInit {

  Todos:any=[];
  showDetails : boolean = false;
  completeTodos:any=[];
  inboxTodo : any = [];
  isEditable : boolean = false;

  currentTodo : todo = {
    name: 'String',
    description: 'String',
    date: undefined,
    complete: false
  };

  constructor(private todoServ: TodoCrudService, 
    private elementRef: ElementRef,
    public fireAuth: FirebaseAuthenticationService,
    //private firestore: AngularFirestore
    ) { }

  @ViewChild('bottomSheet') bottomSheet : ElementRef | undefined;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDetails = false;
    }
  }

  ngOnInit() {
    this.getTodo();
  }

  getTodo(){
    this.todoServ.getAllTodo().subscribe(res=>
      {
        this.Todos = res.map((e:any)=>{
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
        
      // for(let to of this.Todos){
      //   if(to.name == undefined){
      //     //console.log('Todo name', to);
      //     this.deleteTodo(to);
      //     this.Todos.splice(this.Todos.indexOf(to), 1);
      //   }
      // }
      this.refreshTodos();
    })
  }

  deleteTodo(obj : todo){
    this.todoServ.deleteTodo(obj);
    this.showDetails = false;
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

  refreshTodos()
  {
    this.completeTodos = [];
    this.inboxTodo = [];

    for(let t of this.Todos){
      if(t.complete){
        this.completeTodos.push(t);
      }
      else{
        this.inboxTodo.push(t);
      }
    }
  }

  toggleComplete(obj:todo){
    setTimeout(() => {
      obj.complete = !obj.complete;
    this.todoServ.editTodo(obj, obj);
    this.refreshTodos();
    }, 300);
  }

  openTaskDetails(obj : todo){
    this.currentTodo = obj;
    this.showDetails = !this.showDetails;
  }

}


