import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Setting } from '../models/Setting';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  collectionName = "Settings";

  constructor(private afs: AngularFirestore) { }

  create(userSettings: Setting){
    userSettings.id = this.afs.createId(); //ID hozzárendelése/generálása
    return this.afs.collection<Setting>(this.collectionName).doc(userSettings.id).set(userSettings);
  }


  update(userSettings: Setting){
    return this.afs.collection<Setting>(this.collectionName).doc(userSettings.id).set(userSettings);
  }


  getSettingByUserId(){
    const user = JSON.parse((localStorage.getItem('user')) as string) as firebase.default.User;
    return this.afs.collection<Setting>(this.collectionName, ref => ref.where('user_id', '==', user.uid)).valueChanges();
  }
}
