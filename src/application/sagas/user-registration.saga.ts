import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { UserRegisteredEvent } from 'src/application/events/user-registered.event';

@Injectable()
export class UserRegistrationSaga {
    constructor(private readonly eventBus: EventBus) { }

    async handle(event: UserRegisteredEvent) {
        console.log(`Handling user registration event for ${event.username}`);
        // انجام عملیات اضافی مثل ارسال ایمیل خوش‌آمدگویی
    }
}

