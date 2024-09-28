import { ConfigService } from '@nestjs/config';
import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig = (
  configService: ConfigService,
): ClientsModuleOptions => [
  {
    name: 'KAFKA_CLIENT',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'bookah-event-management',
        brokers: [configService.get<string>('KAFKA_BROKER') || 'kafka:9092'],
      },
      consumer: {
        groupId: 'bookah-event-management-consumer-group',
      },
    },
  },
];
