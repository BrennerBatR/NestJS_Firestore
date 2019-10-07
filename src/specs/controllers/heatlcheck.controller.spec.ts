
import { Test } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import fastify = require('fastify');
import { HealthcheckController } from '../../controllers/healthcheck.controller';

describe('HeatlcheckControlelr', () => {
  let app: NestFastifyApplication
  beforeAll(async (resolve) => {
    const module = await Test.createTestingModule({
      controllers: [HealthcheckController]
    }).compile()
    app = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    )
    app.useGlobalPipes(new ValidationPipe());
    await app.init()
    resolve()
  })
  
  describe('/healthcheck 200', () => {
    let response: fastify.HTTPInjectResponse
    let parsedPayload: any
    beforeAll(async () => {
      response = await app.inject({
        method: 'GET',
        url: `/healthcheck`,
      })
      parsedPayload = JSON.parse(response.payload)
    })
    it('is expected to return success response', () => {
      expect(response.statusCode).toBe(200)
      expect(parsedPayload).toEqual({ status: 'online' })
    })
  })

  afterAll(async () => {
    await app.close()
  })
})