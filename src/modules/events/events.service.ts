import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Events } from './entities/events.entity';
import { Between, Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private eventsRepository: Repository<Events>,
  ) {}

  getEvents(): Promise<Events[]> {
    return this.eventsRepository.find();
  }

  async createEvent(createEventDto: CreateEventDto): Promise<Events> {
    await this.checkEventOnSameDay(
      createEventDto.venueId,
      createEventDto.dateTime,
    );

    const newEvent = this.eventsRepository.create({
      ...createEventDto,
    });

    return await this.eventsRepository.save(newEvent);
  }

  private async checkEventExists(name: string): Promise<Events | null> {
    return this.eventsRepository.findOne({
      where: { name },
    });
  }

  private async checkEventOnSameDay(
    venueId: number,
    dateTime: string,
  ): Promise<void> {
    const date = new Date(dateTime);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const overlappingEvent = await this.eventsRepository.findOne({
      where: {
        venueId,
        dateTime: Between(startOfDay.toISOString(), endOfDay.toISOString()),
      },
    });

    if (overlappingEvent) {
      throw new HttpException(
        'Another event is scheduled on the same day in this venue.',
        HttpStatus.CONFLICT,
      );
    }
  }
}
