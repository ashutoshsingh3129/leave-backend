import { IsNotEmpty, IsIn, IsOptional, IsDate } from 'class-validator';

export class UpdateLeaveDto {
  @IsNotEmpty()
  @IsIn(['APPROVED', 'DENIED'])
  status: string;

  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;
}
