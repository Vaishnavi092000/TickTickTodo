import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { todo } from 'src/app/todo';


@Injectable({
  providedIn: 'root'
})

export class TodoCrudService {

  firestore: AngularFirestore = inject(AngularFirestore);

  constructor() {
   }

  createTodo(newtodo:todo){
    //console.log('inside create');
    newtodo.id = this.firestore.createId();
    const col = this.firestore.collection('/Todo').add
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
   return this.firestore.collection('/Todo').snapshotChanges();
  }

  editTodo(objDEl : todo, obj : todo){
    this.deleteTodo(objDEl);
    this.createTodo(obj);
  }

  deleteTodo(obj : todo){
    const docPath = '/Todo/' + obj.id;
    this.firestore.doc(docPath).delete();
  }

}