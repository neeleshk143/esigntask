// test/e2e/esign.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
// import { AppModule } from '../../src/modules/app.module';
import { AppModule } from 'src/app.module'; 

describe('EsignController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/esign (POST)', () => {
    return request(app.getHttpServer())
      .post('/esign')
      .send({ userId: '123', pdfUrl: 'https://gbihr.org/images/docs/test.pdf', esignTags: [] })
      .expect(201);
  });
});
