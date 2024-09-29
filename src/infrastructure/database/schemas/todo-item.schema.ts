import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TodoItem extends Document {
    @Prop({ required: true })
    todoListId: string;

    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    priority: number;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
