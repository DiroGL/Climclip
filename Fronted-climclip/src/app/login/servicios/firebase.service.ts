import { Injectable, inject } from '@angular/core';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


import { AngularFireAuth } from '@angular/fire/compat/auth'
import {  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth'
import { User } from '../models/user.models';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc,getDocs, query, where, updateDoc, } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import {getStorage, uploadString, ref, getDownloadURL } from "firebase/storage"
import { QuerySnapshot, addDoc, collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Block } from '../models/block.models';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth)
  firestore = inject(AngularFirestore)
  utilSvc = inject(UtilsService)

  constructor(private afAuth: AngularFireAuth) {}
  //Paginacion y filtro






  // Autenticacion

  getAuth(){

    return getAuth()
  }


  // Acceder

  // Google

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = this.getAuth()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    return signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
    
   
      return result.user
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      this.utilSvc.presentToast({
              message: errorMessage + errorCode,
              duration: 2500,
              color: 'danger',
              position: 'middle',
              icon: 'alert-circle-outline'
            });
  
      
      // ...
    });
  }

  handleRedirectResult() {
    return this.afAuth.getRedirectResult();
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


  //Recoger Documentos
  getPaginatedDocuments(collection: string, pageSize: number, startAfterDoc: any = null, currentUserUid?: string): Observable<Block[]> {
    return new Observable(observer => {
      let query = this.firestore.collection(collection, ref => {
        let q = ref.orderBy('fecha', 'desc').limit(pageSize);
        if (startAfterDoc) {
          q = q.startAfter(startAfterDoc.fecha); // Ajuste en startAfter, usar el campo de orden
        }
        // Excluir documentos subidos por el usuario actual
        if (currentUserUid) {
          q = q.where('uid', '!=', currentUserUid);
        }
        return q;
      });

      query.snapshotChanges().subscribe(actions => {
        const documents = actions.map(a => {
          const data = a.payload.doc.data() as Block;
          const id = a.payload.doc.id;
          return { id, ...data }; // Asegúrate de que data es un objeto
        });
        observer.next(documents);
        observer.complete();
      }, error => {
        console.error('Error in snapshotChanges subscription:', error); // Log adicional
        observer.error(error);
      });
    });
  }

  // getRandomDocuments(collectionPath: string, pageSize: number, minNumber: number, maxNumber: number,id: string): Observable<any[]> {
  //   return this.firestore.collection(collectionPath, ref => {
  //     let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
  //     // Aplicar filtro numérico si se proporcionan los parámetros
  //     if (minNumber !== null && maxNumber !== null) {
  //       query = query.where('valorRange', '>=', minNumber).where('valorRange', '<=', maxNumber)
  //     }
  //     return query;
  //   }).get().pipe(
  //     map(snapshot => {
  //       const documents = snapshot.docs.map(doc => doc.data()).filter((doc: Block) => doc.uid !== id);;
  //       const randomDocuments = [];
  //       const totalDocuments = documents.length;
  //       const randomIndices = this.generateRandomIndices(totalDocuments, pageSize);
  //       randomIndices.forEach(index => {
  //         randomDocuments.push(documents[index]);
  //       });
  //       return randomDocuments;
  //     })
  //   );
  // }

  private generateRandomIndices(totalDocuments: number, pageSize: number): number[] {
    const randomIndices = [];
    for (let i = 0; i < pageSize; i++) {
      randomIndices.push(Math.floor(Math.random() * totalDocuments));
    }
    return randomIndices;
  }




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
buscarDocumentos(coleccion: string, campo: string, texto: string) {
  return this.firestore.collection(coleccion, ref =>
    ref.where(campo, '>=', texto)
       .where(campo, '<=', texto + '\uf8ff')
  ).valueChanges();
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
