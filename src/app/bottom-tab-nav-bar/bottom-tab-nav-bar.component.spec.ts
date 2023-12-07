import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BottomTabNavBarComponent } from './bottom-tab-nav-bar.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FirebaseAuthenticationService } from '../Services/firebaseCrud/firebase-authentication.service';

describe('BottomTabNavBarComponent', () => {
  let component: BottomTabNavBarComponent;
  let fixture: ComponentFixture<BottomTabNavBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomTabNavBarComponent ],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
      ],
      providers: [FirebaseAuthenticationService]
    }).compileComponents();

    fixture = TestBed.createComponent(BottomTabNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
