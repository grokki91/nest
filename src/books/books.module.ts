import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book, BookSchema } from './schemas/book.schema';
import { AuthModule } from 'src/auth/auth.module';
import {
  BookCommentModel,
  BookCommentSchema,
} from './schemas/book.comments.schema';
import { BookCommentsService } from './book.comments.service';
import { BookCommentsController } from './book.comments.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([
      { name: BookCommentModel.name, schema: BookCommentSchema },
    ]),
    AuthModule,
  ],
  controllers: [BooksController, BookCommentsController],
  providers: [BooksService, BookCommentsService],
  exports: [BooksService, BookCommentsService],
})
export class BooksModule {}
