
import { Product } from 'src/interfaces/product.interface';
import { Product as ProductEntity } from '../entities/product.entity'
import { ProductAlreadyExistsError, ProductBadRequestError, ProductNotFoundError } from './errors.services';
import { ProductRepos } from '../repos/product.repos'
import { Injectable, NotFoundException, HttpStatus, BadRequestException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class ProductService {
    authConfig: string
    constructor(private readonly productRepos: ProductRepos) {
        this.authConfig = process.env.SECRET_TOKEN;
    }

    insertProduct = async (product: Product): Promise<ProductEntity> => {
        return this.productRepos.getProductByCode(product.code)
            .then((productCode: FirebaseFirestore.QuerySnapshot) => {
                return new Promise(async (resolve, reject) => {
                    if (productCode == undefined || productCode.empty) {
                        resolve(this.productRepos.add(product))
                    } else {
                        reject(new ProductAlreadyExistsError('code', product.code))
                    }
                })
            })
    }

}
