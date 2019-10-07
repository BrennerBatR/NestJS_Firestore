import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ProductModule } from './modules/product.module'
@Module({
  imports: [ProductModule]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {

  }
}
