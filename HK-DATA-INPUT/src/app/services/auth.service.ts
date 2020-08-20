import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { DatabaseService } from './database.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import User from './../User';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  constructor(public afAuth: AngularFireAuth, public afBase: AngularFirestore, private router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user) {
          return this.afBase.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    }

    async googleSignin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
    }
    async emailLogIn({email, password}) {
    const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
    }

    async emailSignIn({mail, displayName, photoURL, password}){
      console.log(mail)
      const credential = await this.afAuth.createUserWithEmailAndPassword(mail, password);
      const uid = credential.user.uid;
      const email = credential.user.email;
      console.log(email, uid)
      return this.updateUserData({uid, email, displayName, photoURL})
    }
    async signOut(){
      await this.afAuth.signOut();
      return this.router.navigate(['/connect']);
    }

    private updateUserData({uid, email, displayName, photoURL}: User){
      const userRef: AngularFirestoreDocument<User> = this.afBase.doc(`users/${uid}`);
      const data: User = {
        uid,
        email,
        displayName,
        photoURL
      }
      return userRef.set(data, {merge: true});

    }
}
