import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { todo } from 'src/app/todo';
import { UserCrudService } from '../userCrud/user-crud.service';


@Injectable({
  providedIn: 'root'
})

export class TodoCrudService {

  //firestore: AngularFirestore = inject(AngularFirestore);

  constructor(
    private userServ : UserCrudService,
    private firestore : AngularFirestore
    ) {}

  currentUser = this.userServ.getCurrentUser();

  todoCollection = this.currentUser.todoCollection;

  createTodo(newtodo:todo){
    //console.log('inside create');
    //console.log('current user in create todo', this.currentUser);
    //console.log('collection name', this.todoCollection);
    newtodo.id = this.firestore.createId();
    const col = this.firestore.collection('/'+this.todoCollection).add
    (
      {
        'id' : newtodo.id,
        'name' : newtodo.name,
        'description' : newtodo.description,
        'date' : newtodo.date,
        'complete' : newtodo.complete
      }
    );
  }

  getAllTodo(){
    console.log('currentUser in getAll', this.currentUser);
    console.log('todo collection name in getAll', this.todoCollection);
    return this.firestore.collection('/'+this.todoCollection).snapshotChanges();
  }

  editTodo(objDEl : todo, obj : todo){
    this.deleteTodo(objDEl);
    this.createTodo(obj);
  }

  deleteTodo(obj : todo){
    const collection  = '/'+this.todoCollection;
    const docPath = collection+'/'+ obj.id;
    console.log('docpath', docPath);
    this.firestore.doc(docPath).delete();
  }

}
