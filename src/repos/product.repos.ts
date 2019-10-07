import { Firestore, CollectionReference, QueryDocumentSnapshot } from '@google-cloud/firestore'
import { Injectable } from '@nestjs/common';
import { ValidationArguments } from 'class-validator';
import { Product } from 'src/interfaces/product.interface';
import { Product as ProductEntity } from '../entities/product.entity'
import { Promise } from 'bluebird';

@Injectable()
export class ProductRepos {
    db: Firestore
    collection: CollectionReference

    constructor(db: Firestore) {
        this.db = db
        this.collection = this.db.collection('products')
    }

    async add(product: Product): Promise<FirebaseFirestore.DocumentReference> {
        const insertedProduct = await this.collection.add(product)
        return new Promise((resolve) => resolve(insertedProduct))
    }

    async getProductByCode(code: string): Promise<FirebaseFirestore.DocumentData> {
        let productObj = {}
        try {
            const snapshot = await this.collection.where('code', '==', code).get();
            snapshot.forEach((doc) => {
                productObj = doc.data()
                productObj['id'] = doc.id
            });
        }
        catch (err) {
            console.log(`Error`, err)
        }

        return new Promise((resolve) => {
            if (!productObj.hasOwnProperty("code"))
                resolve(undefined)
            resolve(productObj)
        })
    }


}