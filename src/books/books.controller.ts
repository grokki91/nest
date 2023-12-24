import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './interfaces/dto/create-book';
import { Book, BookDocument } from './schemas/book.schema';
import { IParamId } from './interfaces/param-id';
import { HydratedDocument } from 'mongoose';
import { UpdateBookDto } from './interfaces/dto/update-book';
import { BookCreateInterceptor } from './interceptors/books.interceptors';
import { ValidationPipe } from './validation/validation.pipe';
import { validationSchema } from './validation/schema/validation.pipe.schema';

@UsePipes(new ValidationPipe(validationSchema))
@UseInterceptors(BookCreateInterceptor)
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  public getBooks(): Promise<BookDocument[]> {
    return this.bookService.getBooks();
  }

  @Post()
  public createBook(@Body() body: CreateBookDto): Promise<BookDocument> {
    return this.bookService.create(body);
  }

  @Get(':id')
  public getBook(@Param() { id }): Promise<Book> {
    return this.bookService.getBook(id);
  }

  @Put(':id')
  public updateBook(
    @Param() { id }: IParamId,
    @Body() body: UpdateBookDto,
  ): Promise<HydratedDocument<BookDocument, any, any> | null> {
    return this.bookService.update(id, body);
  }

  @Delete(':id')
  public deleteBook(
    @Param() { id }: IParamId,
  ): Promise<HydratedDocument<BookDocument, any, any> | null> {
    return this.bookService.delete(id);
  }
}
