// leaves.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeavesService } from './leaves.service';
import { LeavesController } from './leaves.controller';
import { Leave, LeaveSchema } from './schemas/leave.schema';
import { LeavesDbService } from './leaves.db.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Leave.name, schema: LeaveSchema },  // Register Leave model
    ]),
  ],
  controllers: [LeavesController],
  providers: [LeavesService,LeavesDbService],
})
export class LeavesModule {}
