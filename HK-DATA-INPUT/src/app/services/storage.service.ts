import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  constructor(private storage: AngularFireStorage) { }
  upload(file: File){
    const path = file.name;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, file);
  }
  get(filename){
   return this.storage.ref(filename).getDownloadURL();
  }

}
