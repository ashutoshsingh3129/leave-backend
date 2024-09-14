import { IsNotEmpty, IsArray, IsDateString, ArrayNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';



export class CreateLeaveDto {
  @IsNotEmpty()
  partnerId: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  slots: string[];
}
