import { Injectable } from '@nestjs/common';
import { Model, Connection, HydratedDocument } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './interfaces/dto/create-book';
import { UpdateBookDto } from './interfaces/dto/update-book';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<Book>,
    @InjectConnection() private connection: Connection,
  ) {}

  public getBooks(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
  }

  public getBook(id: string): Promise<Book> {
    return this.BookModel.findById(id).lean().exec();
  }

  public create(data: CreateBookDto): Promise<BookDocument> {
    const book = new this.BookModel(data);
    return book.save();
  }

  public update(
    id: string,
    data: UpdateBookDto,
  ): Promise<HydratedDocument<BookDocument, any, any> | null> {
    return this.BookModel.findByIdAndUpdate({ _id: id }, data);
  }

  public delete(
    id: string,
  ): Promise<HydratedDocument<BookDocument, any, any> | null> {
    return this.BookModel.findOneAndRemove({ _id: id });
  }
}
