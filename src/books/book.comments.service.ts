import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { BookCommentModel } from './schemas/book.comments.schema';
import { Connection, Model } from 'mongoose';
import { CreateCommentDto } from './interfaces/dto/create-comment';
import { UpdateBookDto } from './interfaces/dto/update-book';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class BookCommentsService {
  constructor(
    @InjectModel(BookCommentModel.name)
    private CommentsModel: Model<BookCommentModel>,
    @InjectConnection() private connection: Connection,
  ) {}

  async addComment(dto: CreateCommentDto): Promise<BookCommentModel> {
    const comment = new this.CommentsModel(dto);

    try {
      await this.CommentsModel.findById(dto.bookId).exec();
      return comment.save();
    } catch (error) {
      throw new NotFoundException(`Not found book with id ${dto.bookId}`);
    }
  }

  async readComment(id: string): Promise<BookCommentModel> {
    return await this.CommentsModel.findById(id).lean().exec();
  }

  async readAllComments(): Promise<BookCommentModel[]> {
    return await this.CommentsModel.find();
  }

  async updateComment(id: string, dto: UpdateBookDto): Promise<boolean> {
    return await this.CommentsModel.findByIdAndDelete({ _id: id }, dto);
  }

  async deleteComment(id: string): Promise<boolean> {
    await this.CommentsModel.findByIdAndRemove(id);
    return true;
  }

  async findAllBookComment(bookId: string): Promise<BookCommentModel[]> {
    const comments = await this.CommentsModel.find({ bookId }).exec();

    try {
      await this.CommentsModel.findById(bookId).exec();
      return comments;
    } catch (error) {
      throw new NotFoundException(`Not found book with id ${bookId}`);
    }
  }
}
