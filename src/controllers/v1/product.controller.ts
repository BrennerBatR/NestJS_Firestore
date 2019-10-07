import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Req,
    Res,
    Param,
    NotFoundException,
    Query,
    BadRequestException,
    ForbiddenException,
    HttpException,
    HttpStatus,
  } from '@nestjs/common'
  import { Product } from '../../interfaces/product.interface'
  import { Product as ProductEntity} from '../../entities/product.entity'
  import { ProductService } from '../../services/product.services'
  import { ApiResponse, ApiUseTags, ApiImplicitParam, ApiImplicitQuery } from '@nestjs/swagger';
  import { ProductAlreadyExistsError, ProductBadRequestError, ProductNotFoundError } from '../../services/errors.services'
  
  @ApiUseTags('Product')
  @Controller('products')
  export class ProductController {
    constructor(
      private readonly productService: ProductService,
    ) { }
  
    @Post()
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 404, description: 'Role não encontrada' })
    @ApiResponse({ status: 405, description: 'Email já cadastrado' })
    @ApiResponse({ status: 405, description: 'CPF já cadastrado' })
    async insertProduct(@Body() product: ProductEntity, @Res() res) {
      try {
        await this.productService.insertProduct(product)
          .then((productDocument: Product) =>
            res
              .code(201)
              .send({ productId: productDocument.id })
          )
          .catch(error => {
            if (error instanceof ProductAlreadyExistsError) {
              res
                .code(400)
                .send({ error: error.name, message: error.message })
            }
            else if (error instanceof ProductBadRequestError) {
              res
                .code(400)
                .send({ error: error.name, message: error.message })
            }
          })
      } catch (e) {
        res
          .code(500)
          .send(e)
      }
    }
  }
  