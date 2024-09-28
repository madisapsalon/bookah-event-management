import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './modules/events/events.module';
import { EventsController } from './modules/events/events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from './config/postgres.config';
import { DataSource } from 'typeorm';
import { ClientsModule } from '@nestjs/microservices';
import { kafkaConfig } from './config/kafka.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: postgresConfig,
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync(kafkaConfig(new ConfigService())),
    EventsModule,
  ],
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
      console.log('Postgres DB connection successful');
    } else {
      console.log('Postgres DB connection already established');
    }
  }
}
