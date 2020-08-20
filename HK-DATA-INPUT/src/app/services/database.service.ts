import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private afBase: AngularFirestore) {}

  saveUser(user){
    this.afBase.collection('users').add(user);
  }
}
