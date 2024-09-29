import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('TodoListController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                MongooseModule.forRoot('mongodb://localhost/todo-app-test'),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/todo-lists (POST)', async () => {
        const createTodoListDto = { userId: 'user1', title: 'My Todo List' };
        return request(app.getHttpServer())
            .post('/todo-lists')
            .send(createTodoListDto)
            .expect(201)
            .then((response) => {
                expect(response.body.title).toBe('My Todo List');
            });
    });

    it('/todo-lists/:userId (GET)', async () => {
        return request(app.getHttpServer())
            .get('/todo-lists/user1')
            .expect(200)
            .then((response) => {
                expect(Array.isArray(response.body)).toBe(true);
            });
    });

    // Additional tests for update and delete
});
