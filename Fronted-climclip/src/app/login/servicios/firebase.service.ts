import { Injectable, inject } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth'
import {  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { User } from '../models/user.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth)
  firestore = inject(AngularFirestore)
  utilSvc = inject(UtilsService)

  // Autenticacion

  getAuth(){

    return getAuth()
  }

  // Acceder


  // Google

  signUpWithGoogle(){
    return signInWithPopup(getAuth(),new GoogleAuthProvider())
  }

  singIn(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }


   // Registrar
   singUp(user: User){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  // cerrar sesion
  singOut(){
    getAuth().signOut()
    localStorage.removeItem('user')
    this.utilSvc.routerlink('/home-login')
  }

  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser, {displayName})
  }


  // Recuperar contraseña

  sendRecoveryEmail(email :string ){
    return sendPasswordResetEmail(getAuth(), email)
  }


  // Base de Datos

  // Setear un documento
  setDocument(path : string, data:any){
    return setDoc(doc(getFirestore(), path), data);
  }


  //Get document
  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path))).data() ;

  }


}
