import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Leave extends Document {
  @Prop({ required: true })
  partnerId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: false })
  slots: string[];

  @Prop({ default: 'PENDING' })
  status: 'PENDING' | 'APPROVED' | 'DENIED';
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);
