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
import { Book } from './schemas/book.schema';
import { IParamId } from './interfaces/param-id';
import { UpdateBookDto } from './interfaces/dto/update-book';
import { BookCreateInterceptor } from './interceptors/books.interceptors';
import { ValidationPipe } from './validation/validation.pipe';
import { validationSchema } from './validation/schema/validation.pipe.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  public getBooks(): Promise<Book[]> {
    // throw new HttpException('opp', 500);
    return this.bookService.getBooks();
  }

  @UsePipes(new ValidationPipe(validationSchema))
  @UseInterceptors(BookCreateInterceptor)
  @Post()
  public createBook(@Body() body: CreateBookDto): Promise<Book> {
    return this.bookService.create(body);
  }

  @Get(':id')
  public getBook(@Param() { id }): Promise<Book> {
    return this.bookService.getBook(id);
  }

  @UsePipes(new ValidationPipe(validationSchema))
  @UseInterceptors(BookCreateInterceptor)
  @Put(':id')
  public updateBook(
    @Param() { id }: IParamId,
    @Body() body: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.update(id, body);
  }

  @Delete(':id')
  public deleteBook(@Param() { id }: IParamId): Promise<Book> {
    return this.bookService.delete(id);
  }
}
