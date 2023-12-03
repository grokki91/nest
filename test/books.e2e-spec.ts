import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { BooksModule } from '../src/books/books.module';
import { BooksController } from '../src/books/books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { mockBooks } from '../src/books/tests/mocks';
import { BooksService } from '../src/books/books.service';

jest.mock('../src/books/books.service');

describe('BooksController (e2e)', () => {
  let app: INestApplication;
  const mockService = {
    getBooks: jest.fn().mockResolvedValue(mockBooks.books),
    getBook: jest.fn().mockResolvedValue(mockBooks.book),
    create: jest.fn().mockResolvedValue(mockBooks.book),
    update: jest.fn().mockResolvedValue(200),
    delete: jest.fn().mockResolvedValue(mockBooks.book),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        BooksModule,
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB),
      ],
      providers: [BooksController],
    })
      .overrideProvider(BooksService)
      .useValue(mockService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('Request by /books', () => {
    return request(app.getHttpServer()).get('/books').expect(HttpStatus.OK);
  });

  it('Request by /books/:id', async () => {
    const response = await request(app.getHttpServer()).get('/books/1');
    expect(response.body).toEqual(mockBooks.book);
  });

  it('Post request by /books', async () => {
    const response = await request(app.getHttpServer())
      .post('/books')
      .send(mockBooks.book);

    expect(response.status).toBe(HttpStatus.CREATED);
  });

  it('Put request by /books/:id', async () => {
    const response = await request(app.getHttpServer())
      .put('/books/1')
      .send('dfdsfsdf');

    expect(response.status).toBe(500);
  });

  it('Delete request by /books/:id', async () => {
    const response = await request(app.getHttpServer()).delete('/books/1');

    expect(response.status).toBe(HttpStatus.OK);
  });
});
