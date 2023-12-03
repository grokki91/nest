import { Injectable } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './interfaces/dto/create-book';
import { UpdateBookDto } from './interfaces/dto/update-book';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<Book>,
    @InjectConnection() private connection: Connection,
  ) {}

  public getBooks(): Promise<Book[]> {
    return this.BookModel.find().exec();
  }

  public getBook(id: string): Promise<Book> {
    return this.BookModel.findById(id).exec();
  }

  public create(data: CreateBookDto): Promise<Book> {
    const book = new this.BookModel(data);
    return book.save();
  }

  public update(id: string, data: UpdateBookDto): Promise<Book> {
    return this.BookModel.findByIdAndUpdate({ _id: id }, data);
  }

  public delete(id: string): Promise<Book> {
    return this.BookModel.findOneAndRemove({ _id: id });
  }
}
