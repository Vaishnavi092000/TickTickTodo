import { Component,ElementRef,HostListener,OnInit, ViewChild, inject } from '@angular/core';
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

  constructor(private todoServ: TodoCrudService, private elementRef: ElementRef) { }

  firestore: AngularFirestore = inject(AngularFirestore);

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
    this.todoServ.getAllTodo().subscribe(res=>{
      this.Todos = res.map((e:any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      }); 

      this.refreshTodos();
    })
  }

  deleteTodo(obj : todo){
    console.log('inside delete');
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

    console.log('newtodo for editing', newTodo);

    this.todoServ.editTodo(this.currentTodo, newTodo);

    this.showDetails = false;
  }

  refreshTodos(){
    console.log('inside refresh');
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

    console.log('completed', this.completeTodos);
  }

  toggleComplete(obj:todo){
    setTimeout(() => {
      obj.complete = !obj.complete;
    console.log('Toggle ', obj);
    this.todoServ.editTodo(obj, obj);
    this.refreshTodos();
    }, 300);
  }

  openTaskDetails(obj : todo){
    console.log('open details', obj);
    this.currentTodo = obj;
    this.showDetails = !this.showDetails;
  }
}
