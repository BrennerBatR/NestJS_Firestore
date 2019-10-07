import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ProductController } from '../controllers/v1/product.controller';
import { ProductService } from '../services/product.services';
import { ProductRepos} from '../repos/product.repos'
import { Firestore } from '@google-cloud/firestore';


@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepos, Firestore]
})

export class ProductModule {}
