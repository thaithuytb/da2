import * as mqtt from 'mqtt';
import { SocketGateway } from '../socket/socket.gateway';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export async function subscribeMqtt(socketGateway: SocketGateway) {
  const prisma = new PrismaClient();

  //3.122.43.101:1883 is IP
  const client = mqtt.connect(process.env.MQTT_URL);

  client.on('connect', async function () {
    console.log('Connected to MQTT broker');
    client.subscribe(`datn/quan/#`);
    console.log('subscribe topic: ', `datn/quan/#`);
  });

  client.on('message', async function (topic, message) {
    let parseMessage;
    try {
      parseMessage = JSON.parse(message.toString() as unknown as string);
      //validate
      // if (typeof parseMessage['deviceId'] !== 'number') {
      //   return console.log('ERROR: ParseInt deviceId');
      // }
    } catch (e) {
      console.log('ERROR: parse JSON');
      return;
    }

    if (topic === 'datn/quan/start') {
      //handle Logic
      if (parseMessage['start']) {
        if (typeof parseMessage['start'] !== 'number') {
          return console.log('ERROR: ParseInt start');
        }
        //from deviceId find UserId but in this project default equals 1 =))
        await prisma.historyFollow.create({
          data: {
            name: uuidv4(),
            device: {
              connect: {
                id: parseMessage['deviceId'],
              },
            },
          },
        });
        socketGateway.emitSocketToUser('1', 'start', parseMessage);
        return;
      }
      socketGateway.emitSocketToUser('1', 'end', parseMessage);
      return;
    }

    if (topic === 'datn/quan/data') {
      // if (
      // typeof parseMessage['lat'] !== 'number' ||
      // typeof parseMessage['lon'] !== 'number' ||
      // typeof parseMessage['step'] !== 'number' ||
      // typeof parseMessage['heartRate'] !== 'number' ||
      // typeof parseMessage['period'] !== 'number'
      // ) {
      //   return console.log('ERROR: ParseInt start');
      // }
      //handle logic here
      console.log({ parseMessage });
      socketGateway.emitSocketToUser('1', 'data', {
        type: 'Feature',
        geometry: {
          coordinates: [+parseMessage['lat'], +parseMessage['lon']],
          type: 'Point',
        },
        properties: {
          heartRate: +parseMessage['heartRate'],
          step: +parseMessage['step'],
          period: +parseMessage['period'],
        },
      });
      const history = await findHistoryFollowByDeviceId(
        prisma,
        +parseMessage['deviceId'],
      );

      await prisma.coordinate.create({
        data: {
          lat: +parseMessage['lat'],
          lon: +parseMessage['lon'],
          step: +parseMessage['step'],
          heartRate: +parseMessage['heartRate'],
          period: +parseMessage['period'],
          historyFollowId: history.id,
        },
      });
      console.log('complete !!!');
      return;
    }
  });
}

const findHistoryFollowByDeviceId = async (
  prisma: PrismaClient,
  deviceId: number,
) => {
  return prisma.historyFollow.findFirst({
    where: {
      deviceId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
