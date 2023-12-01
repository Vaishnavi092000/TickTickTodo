import { Injectable, inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class FileuploadService {

  //private storage: Storage = inject(Storage);

  constructor(
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() { }

    uploadFile(file: File, path: string): Observable<string> {
    const filePath = `${path}/${new Date().getTime()}_${file.name}`;
    const storageRef = this.storage['ref'](filePath);
    const uploadTask = this.storage['upload'](filePath, file);

    //this.storage['upload'](filePath, file);    

    return new Observable((observer) => {
      uploadTask.then((snapshot: any) => {
        snapshot.ref.getDownloadURL().then((downloadURL: any) => {
          observer.next(downloadURL);
          observer.complete();
        });
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

}
