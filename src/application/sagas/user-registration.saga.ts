import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { UserRegisteredEvent } from 'src/application/events/user-registered.event';

@Injectable()
export class UserRegistrationSaga {
    constructor(private readonly eventBus: EventBus) { }

    async handle(event: UserRegisteredEvent) {
        console.log(`Saga handling user registration event for user ${event.username}`);

        // Here, we can trigger other asynchronous processes
        // For example, notifying an external service or sending a welcome email.

        // Dispatch another event if necessary
        // this.eventBus.publish(new AnotherEvent(...));
    }
}
