export class DomainError extends Error {
    constructor(message: string) {
      super(message)
      this.name = this.constructor.name
      Error.captureStackTrace(this, this.constructor)
    }
  }
  
  export class ProductAlreadyExistsError extends DomainError {
    constructor(field: string, value: string) {
      super(`Produto já cadastrado com o ${field}: ${value}`)
    }
  }
  
  
  export class ProductBadRequestError extends DomainError {
    constructor(field: string, value: string) {
      super(`Formato incorreto do campo ${field}: ${value} `)
    }
  }
  
  export class ProductNotFoundError extends DomainError {
    constructor(field: string, value: string) {
      super(`Produto com o  ${field}: ${value} não encontrado `)
    }
  }
  
  