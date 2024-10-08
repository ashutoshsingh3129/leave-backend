import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({collection:'timeSlots'})
export class TimeSlot extends Document {
  @Prop({ required: true })
  date: string; 

  @Prop([{ type: String, required: true }])
  timeRanges: string[]; 

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  walker: mongoose.Schema.Types.ObjectId;
}

export const TimeSlotSchema = SchemaFactory.createForClass(TimeSlot);
