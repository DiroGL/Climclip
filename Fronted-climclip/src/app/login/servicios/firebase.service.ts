import { Injectable, inject } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth'
import {  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { User } from '../models/user.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc,getDocs, query, where, updateDoc, } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import{ AngularFireStorage } from '@angular/fire/compat/storage'

import {getStorage, uploadString, ref, getDownloadURL } from "firebase/storage"
import { addDoc, collection } from 'firebase/firestore';
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

  signIn(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }


   // Registrar
  signUp(user: User){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  // cerrar sesion
  signOut(){
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
    console.log(this.getAuth().currentUser?.uid)
    return setDoc(doc(getFirestore(), path), data);
  }

  //Actualizar un Documento
  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  //Get document
  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path))).data() ;
   
  }

  //añadir documento 

  async addDocument(path: string, data: any) {
    const firestore = getFirestore();
    const collectionRef = collection(firestore, path);
    return await addDoc(collectionRef, data);
  }

  
  //Get documents
  async getAllDocuments(collectionPath: string) {
    const firestore = getFirestore();
    const querySnapshot = await getDocs(collection(firestore, collectionPath));
    const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return documents;
  }
  

  // 
  async getDocumentsByParameter(collectionPath: string, params:string, value: string,) {
    const firestore = getFirestore();
    const q = query(collection(firestore, collectionPath), where(params, '==', value));
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return documents;
}



  // Almacenamineto

  async uploadImage(path: string, data_url: string){
    return uploadString(ref(getStorage(),path),data_url,'data_url').then(() => {
      return getDownloadURL(ref(getStorage(),path))
    })
  }

}
