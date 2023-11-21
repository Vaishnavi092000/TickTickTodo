import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTaskBottomSheetComponent } from './add-task-bottom-sheet.component';

describe('AddTaskBottomSheetComponent', () => {
  let component: AddTaskBottomSheetComponent;
  let fixture: ComponentFixture<AddTaskBottomSheetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskBottomSheetComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
