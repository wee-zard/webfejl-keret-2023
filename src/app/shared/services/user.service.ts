import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NewUser } from '../models/NewUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = "Users";

  constructor(private afs: AngularFirestore) { }

  create(user: NewUser){
    return this.afs.collection<NewUser>(this.collectionName).doc(user.id).set(user);
  }

  getById(id: string){
    return this.afs.collection<NewUser>(this.collectionName).doc(id).valueChanges();
  }
}
