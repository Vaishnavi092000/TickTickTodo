import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService extends ErrorHandler {
  constructor(private dialog: MatDialog, private ngZone: NgZone) {
    super();
  }

  override handleError(err: any): void {
    console.error(err);

    /*
    this.dialog.open(AlertDialog, {
      data: { icon: 'Error', message: err.message, buttonText: 'Uh oh!' }
    });
    */

    // solution as provided by Vugar Abdullayev to Stack Overflow question
    // https://stackoverflow.com/questions/69138275/
    // https://github.com/angular/components/issues/7550#issuecomment-345250406
    this.ngZone.run(() => {
      this.dialog.open(AlertDialogComponent, {
        data: { icon: 'Error', message: err.message, buttonText: 'Uh oh!' },
      });
    });
  }
}
