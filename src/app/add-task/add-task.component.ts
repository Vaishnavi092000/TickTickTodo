import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild, inject } from '@angular/core';
import { TodoCrudService } from '../todo-crud.service';
import { todo } from '../todo';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  providers : [DatePipe]
})
export class AddTaskComponent  implements OnInit {

  constructor(private elementRef: ElementRef, private todoServ :TodoCrudService, private datePipe: DatePipe) {}

  today = new Date();
  showForm = false;

  firestore: AngularFirestore = inject(AngularFirestore);
  
  @ViewChild('bottomSheet') bottomSheet : ElementRef | undefined;
  @ViewChild('AddTask') AddTask : ElementRef | undefined;

  formattedDate = this.datePipe.transform(this.today, 'MMM d');

  ngOnInit() {
  }

  toggleBottomSheet() {
    this.showForm = true;
  }

  @Output() close = new EventEmitter<void>();

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showForm = false;
    }
  }

  Create(a: any,b: any) {
    this.showForm= false;
    let newTodo: todo = {
      name : a.value,
      description : b.value,
      date : this.formattedDate,
      complete : false
    };  

   this.todoServ.createTodo(newTodo);
  }

}

