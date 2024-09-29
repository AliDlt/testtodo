import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TodoItem } from '../schemas/todo-item.schema';

@Schema()
export class TodoList extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    title: string;

    @Prop({ type: [{ type: Object, ref: 'TodoItem' }] })
    todoItems: TodoItem[];
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
