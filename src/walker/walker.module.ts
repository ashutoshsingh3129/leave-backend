import { Module } from '@nestjs/common';
import { WalkersController } from './walker.controller';
import { WalkersService } from './walker.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Walker, WalkerSchema } from './schemas/walker.schema';
import { TimeSlot, TimeSlotSchema } from './schemas/timeslot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Walker.name, schema: WalkerSchema },  
      { name: TimeSlot.name, schema: TimeSlotSchema },  

    ]),
  ],
  providers: [WalkersService],
  controllers: [WalkersController]
})
export class WalkerModule {}
