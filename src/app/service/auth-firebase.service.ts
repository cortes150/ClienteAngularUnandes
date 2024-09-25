import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthFirebaseService {
  user!: Observable<any>;
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore
            .collection('usuarios')
            .doc(user.uid)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // registrar(email: string, password: string) {
  //   return this.afAuth.createUserWithEmailAndPassword(email, password);
  // }

  registrar(
    name: string,
    surname: string,
    ci: string,
    email: string,
    password: string,
    rol: string
  ) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // Inserción en Firestore
        return this.firestore.collection('usuarios').doc(result.user?.uid).set({
          name,
          surname,
          ci,
          email,
          rol,
        });
      })
      .catch((error) => {
        console.error('Error en el registro:', error);
        return error; // Manejo de errores
      });
  }
  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user?.uid;
        return this.firestore.collection('usuarios').doc(uid).get();
      });
  }
  logout() {
    return this.afAuth.signOut();
  }
  getUser(): Observable<any> {
    return this.user;
  }
}
