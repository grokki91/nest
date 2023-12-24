import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BookCommentsService } from './book.comments.service';
import { CreateCommentDto } from './interfaces/dto/create-comment';

@Controller('comments')
export class BookCommentsController {
  constructor(private readonly commentService: BookCommentsService) {}

  @Get()
  public readAllComment() {
    return this.commentService.readAllComments();
  }

  @Post()
  public addComment(@Body() dto: CreateCommentDto) {
    return this.commentService.addComment(dto);
  }

  @Get(':id')
  public readComment(@Param() { id }) {
    return this.commentService.readComment(id);
  }

  @Get('book/:bookId')
  public findAllBookComments(@Param() { bookId }) {
    return this.commentService.findAllBookComment(bookId);
  }

  @Delete(':id')
  public deleteComment(@Param() { id }) {
    return this.commentService.deleteComment(id);
  }
}
