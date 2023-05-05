import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Address } from '../models/Address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  collectionName = 'Addresses';

  constructor(private afs: AngularFirestore) { }

  create(userAddress: Address){
    userAddress.id = this.afs.createId(); //ID hozzárendelése/generálása
    return this.afs.collection<Address>(this.collectionName).doc(userAddress.id).set(userAddress);
  }

  checkIfAddressCityStreetHousenumberAldreadyExist(userAddress: Address){
    return this.afs.collection<Address>(this.collectionName, ref =>
      ref.where('address.city', '==', userAddress.address.city)
      .where('address.street', '==', userAddress.address.street)
      .where('address.housenumber', '==', userAddress.address.housenumber)
      .limit(1)).valueChanges();
  }

  getAllAddressedByUserId(user_id: string){
    return this.afs.collection<Address>(this.collectionName, ref => ref.where('user_id', '==', user_id).orderBy('address.city')).valueChanges();
  }

  update(userAddress: Address){
    return this.afs.collection<Address>(this.collectionName).doc(userAddress.id).set(userAddress);
  }

  delete(id: string){
    return this.afs.collection<Address>(this.collectionName).doc(id).delete();
  }
}
