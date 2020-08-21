import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private afBase: AngularFirestore) {}

  saveUser(user) {
    this.afBase.collection('users').add(user);
  }

  getCategories() {
    return this.afBase.collection('categories').valueChanges();
  }

  getCategory(id) {
    return this.afBase.collection('categories').doc(id).valueChanges();
  }

  saveCategory(category){
    this.afBase.collection('categories').doc(category.category_id).update(category);
  }
}
