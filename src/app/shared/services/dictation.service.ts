import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Dictation } from '../models/Dictation';

@Injectable({
  providedIn: 'root'
})
export class DictationService {
  collectionName = 'Dictations';
  constructor(private afs: AngularFirestore) { }

  getAllDictationsByAddressId(address_id: string){
    let currentTimeMinusThreeMonths: number = (Date.now()) - (1000*60*60*24*31*3);
    return this.afs.collection<Dictation>(this.collectionName, ref =>
      ref.where('address_id', '==', address_id)
        .where('dictation_date', '>=', currentTimeMinusThreeMonths)
        .orderBy('dictation_date', 'desc')
        .limit(6)).valueChanges();
  }

  getAllDictationsByAddressIdForDelete(address_id: string){
    return this.afs.collection<Dictation>(this.collectionName, ref => ref.where('address_id', '==', address_id)).valueChanges();
  }

  getLatestDictationsByAddressId(address_id: string){
    return this.afs.collection<Dictation>(this.collectionName, ref => ref.where('address_id', '==', address_id).orderBy('dictation_date', 'desc').limit(1)).valueChanges();
  }

  delete(id: string){
    return this.afs.collection<Dictation>(this.collectionName).doc(id).delete();
  }

  create(newDictation: Dictation){
    newDictation.id = this.afs.createId(); //ID hozzárendelése/generálása
    return this.afs.collection<Dictation>(this.collectionName).doc(newDictation.id).set(newDictation);
  }
}
