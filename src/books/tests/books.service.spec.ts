import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from '../books.controller';
import { BooksService } from '../books.service';
import { mockBooks } from './mocks';

describe('BooksService', () => {
  let module: TestingModule;
  let booksService: BooksService;

  const mockService = {
    create: jest.fn().mockImplementation(() => mockBooks.book),
    getBooks: jest.fn().mockImplementation(() => mockBooks.books),
    getBook: jest.fn().mockImplementation(() => mockBooks.book),
    update: jest.fn().mockImplementation(() => mockBooks.updateBook),
    delete: jest.fn().mockImplementation(() => (mockBooks.books = [])),
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(mockService)
      .compile();

    booksService = module.get<BooksService>(BooksService);
  });

  afterEach(async () => {
    await module.close();
  });

  describe('Testing all methods of BooksService', () => {
    it('create', () => {
      const result = booksService.create(mockBooks.book);
      expect(result).toEqual(mockBooks.book);
    });
    it('getBooks', async () => {
      const result = booksService.getBooks();
      expect(result).toHaveLength(1);
    });
    it('getBook', async () => {
      const result = booksService.getBook('1');
      expect(result).toEqual(mockBooks.book);
    });
    it('update', async () => {
      const result = booksService.update('1', mockBooks.updateBook);
      expect(result).toEqual(mockBooks.updateBook);
    });
    it('delete', async () => {
      await booksService.delete('1');
      expect(booksService.getBooks()).toHaveLength(0);
    });
  });
});
