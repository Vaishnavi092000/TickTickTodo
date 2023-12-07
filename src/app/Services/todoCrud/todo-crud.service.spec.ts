import { TestBed } from '@angular/core/testing';
import { TodoCrudService } from './todo-crud.service';
import { UserCrudService } from '../userCrud/user-crud.service';
import { FirebaseAuthenticationService } from '../firebaseCrud/firebase-authentication.service';

describe('TodoCrudService', () => {
  let service: TodoCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoCrudService,
        UserCrudService,
        FirebaseAuthenticationService
      ]
    });
    service = TestBed.inject(TodoCrudService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
