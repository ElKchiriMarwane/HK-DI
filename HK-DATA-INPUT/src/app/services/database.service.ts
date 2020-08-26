import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
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

  getArticle(id) {
    return this.afBase.collection('articles').doc(id).valueChanges();
  }

  getArticles(){
    return this.afBase.collection('articles').valueChanges();
  }

  saveArticle(article, cat_id){
    let article_id = '';
    return this.afBase.collection('articles').add(article)
    .then(res =>
    {
      article_id = res.id;
      console.log(res.get());
      this.afBase.collection('articles').doc(article_id).update({id : article_id});
      return res.id;
    }
    ).then(resp => {
      this.afBase.collection('categories').doc(cat_id).update({article_ids : firebase.firestore.FieldValue.arrayUnion(article_id)});
      return article_id;
    });
  }
  saveUniqueArticle(article){
    this.afBase.collection('articles').doc(article.id).update(article);
  }
}
