import { Component, OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { todo } from '../todo';
import { TodoCrudService } from '../Services/todoCrud/todo-crud.service';

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
  }


}
