// walker.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TimeSlot } from './timeslot.schema';
import * as mongoose from 'mongoose';


@Schema()
export class Walker extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  verificationStatus: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  city: string;

  @Prop({ default: 'TRAINING' })
  tag: string;

  @Prop({ default: null })
  rating: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot' }])
  timeSlots: TimeSlot[];
}

export const WalkerSchema = SchemaFactory.createForClass(Walker);

