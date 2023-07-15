import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'da2', cors: true })
export class SocketGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('joinUser')
  handleJoinGarden(
    client: any,
    data: {
      userId: number;
    },
  ) {
    if (!data.userId) {
      return;
    }
    this.server.socketsJoin(data.userId.toString());
  }

  emitSocketToUser(userId: string, eventName: string, eventData: any) {
    console.log({ userId, eventName, eventData });
    this.server.to(userId).emit(eventName, eventData);
  }
}
