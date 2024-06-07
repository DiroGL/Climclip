import { Injectable, inject } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth'
import {  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { User } from '../models/user.models';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc,getDocs, query, where, updateDoc, } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import {getStorage, uploadString, ref, getDownloadURL } from "firebase/storage"
import { QuerySnapshot, addDoc, collection } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth)
  firestore = inject(AngularFirestore)
  utilSvc = inject(UtilsService)

  constructor() {}
  //Paginacion y filtro






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

  async getDocumentsByTwoParameters(collectionPath: string, param1: string, value1: string, param2: string, value2: string) {
    const firestore = getFirestore();
    const q = query(
        collection(firestore, collectionPath), 
        where(param1, '==', value1), 
        where(param2, '==', value2)
    );
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return documents;
  }
  //Eliminar 
  async deleteDocumentByPath(documentPath: string): Promise<void> {
    try {
      await this.firestore.doc(documentPath).delete(); 
    } catch (error) {
      throw new Error('No se pudo eliminar el documento');
    }
  }

  //Eliminar segun parametro
  async deleteDocumentByParameter(collectionPath: string, field: string, value: any): Promise<void> {
    const querySnapshot = await this.firestore.collection(collectionPath, ref => ref.where(field, '==', value)).get().toPromise();
    const batch = this.firestore.firestore.batch();

    querySnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  }
  // Función para eliminar un documento por un parámetro
  async deleteDocumentsByParameters(collectionPath: string, field1: string, value1: any, field2: string, value2: any): Promise<void> {
    const querySnapshot = await this.firestore.collection(collectionPath, ref => 
      ref.where(field1, '==', value1).where(field2, '==', value2)
    ).get().toPromise();
    
    const batch = this.firestore.firestore.batch();

    querySnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  }
  // Almacenamineto

  async uploadImage(path: string, data_url: string){
    return uploadString(ref(getStorage(),path),data_url,'data_url').then(() => {
      return getDownloadURL(ref(getStorage(),path))
    })
  }

}
