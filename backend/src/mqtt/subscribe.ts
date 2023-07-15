import { PrismaClient } from '@prisma/client';
import * as mqtt from 'mqtt';
import { uuid } from 'uuidv4';
import { SocketGateway } from '../socket/socket.gateway';

export async function subscribeMqtt(socketGateway: SocketGateway) {
  // const prisma = new PrismaClient();

  //3.122.43.101:1883 is IP
  const client = mqtt.connect(process.env.MQTT_URL);

  client.on('connect', async function () {
    console.log('Connected to MQTT broker');
    client.subscribe(`datn/quan/*`);
    console.log('subscribe topic: ', `datn/quan/*`);
  });

  client.on('message', async function (topic, message) {
    let parseMessage;
    try {
      parseMessage = JSON.parse(message.toString() as unknown as string);
      // if (parseMessage['from'] === 'web') {
      //   console.log({ parseMessage });
      //   return console.log('message from web');
      // }
    } catch (e) {
      console.log('ERROR: parse JSON');
      return;
    }

    if (topic === 'datn/quan/start') {
      //handle Logic
      if (parseMessage['start']) {
        socketGateway.emitToGarden(
          parseMessage['userId'].toString(),
          'start',
          parseMessage,
        );
        return;
      }
      socketGateway.emitToGarden(
        parseMessage['userId'].toString(),
        'end',
        parseMessage,
      );
      return;
    }

    if (topic === 'datn/quan/data') {
      //handle logic here
      socketGateway.emitToGarden(
        parseMessage['userId'].toString(),
        'data',
        parseMessage,
      );
      return;
    }
  });
}
