import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TodoList } from '../schemas/todo-list.schema';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: [{ type: String }] })
    todoLists: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
