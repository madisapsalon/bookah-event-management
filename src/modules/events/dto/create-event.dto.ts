import {
  IsString,
  IsInt,
  IsDateString,
  IsPositive,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  @MaxLength(1000)
  description: string;

  @IsInt()
  @IsPositive()
  venueId: number;

  @IsDateString()
  dateTime: string;

  @IsInt()
  @IsPositive()
  capacity: number;
}
