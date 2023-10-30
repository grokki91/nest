import { Injectable } from '@nestjs/common';
import { IBook } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  private readonly books: IBook[] = [];

  getBooks() {
    return this.books;
  }
}
