import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { IBook } from './interfaces/book.interface';
import { CreateBookDto } from './interfaces/dto/create-book';
import { BookDocument } from './schemas/book.schema';
import { IParamId } from './interfaces/param-id';
import { HydratedDocument, QueryWithHelpers } from 'mongoose';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  public getBooks() {
    this.bookService.getBooks();
  }

  @Post()
  public createBook(@Body() body: CreateBookDto): Promise<BookDocument> {
    return this.bookService.create(body);
  }

  @Get()
  public getBook(id: string): IBook {
    return;
  }

  @Put()
  public updateBook(id: string): void {}

  @Delete()
  public deleteBook(
    @Param() { id }: IParamId,
  ): QueryWithHelpers<
    HydratedDocument<TodoDocument, {}, {}> | null,
    HydratedDocument<TodoDocument, {}, {}>,
    {},
    TodoDocument
  > {
    return this.bookService.delete(id);
  }
}
