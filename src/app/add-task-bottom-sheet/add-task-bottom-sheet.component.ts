import { Component, OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TodoCrudService } from '../todo-crud.service';
import { todo } from '../todo';

@Component({
  selector: 'app-add-task-bottom-sheet',
  templateUrl: './add-task-bottom-sheet.component.html',
  styleUrls: ['./add-task-bottom-sheet.component.scss'],
})
export class AddTaskBottomSheetComponent {

  firestore: AngularFirestore = inject(AngularFirestore);
  
  constructor(
    private bottomSheetRef: MatBottomSheetRef<AddTaskBottomSheetComponent>,
    private todoServ:TodoCrudService
  ) {
  } 
    
  Create() {
    //a: any,b: any
    //console.log('Name', a.value);
    //console.log('Desc', b.value);

    // const col2 = this.firestore.collection('/Todo').add
    //   (
    //     {  
    //       'name':"book2",
    //       'description' : "test desc",
    //       'date': "demo date3",
    //       'complete' : true,  
    //     }
    //   ); 
    

    // let newTodo: todo = {
    //   name : a.value,
    //   description : b.value,
    //   date : "String",
    //   complete : false
    // };
    // console.log('newTodo from addtask', newTodo);
    //return false;
  

   //this.todoServ.createTodo();
  }

  // openLink(event: MouseEvent): void {
  //   this.bottomSheetRef.dismiss();
  //   event.preventDefault();
  // }

}
