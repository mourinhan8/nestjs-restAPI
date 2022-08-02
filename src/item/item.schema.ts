import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop()
  name: string;

  @Prop()
  amount: number;

  @Prop()
  description: string;
}

export class ItemInput {
    name: string;
    description: string;
    amount: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);