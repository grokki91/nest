import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BookCommentsService } from './books/book.comments.service';
import { CreateCommentDto } from './books/interfaces/dto/create-comment';

@WebSocketGateway({ cors: true })
export class AppGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly commentService: BookCommentsService) {}

  @SubscribeMessage('getComment')
  async getAllComments(client: Socket, bookId: string) {
    try {
      const comments = await this.commentService.findAllBookComment(bookId);
      this.server.to(client.id).emit('comments', comments);
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage('addComment')
  async addComment(@MessageBody() data: CreateCommentDto): Promise<void> {
    try {
      const comment = await this.commentService.addComment(data);
      this.server.emit('comments', comment);
    } catch (error) {
      console.log(error);
    }
  }
}
