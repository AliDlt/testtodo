import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

describe('TodoListController (e2e)', () => {
    let app: INestApplication;
    let dbConnection: Connection;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost/todo-app-test'), // Use a test-specific DB
                AppModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        dbConnection = moduleFixture.get<Connection>(getConnectionToken()); // Get the MongoDB connection

        await app.init();
    });

    afterAll(async () => {
        // Close the app and DB connection after all tests are done
        await dbConnection.dropDatabase(); // Clean up the database
        await app.close();
    });

    afterEach(async () => {
        // Clean the todo-lists collection after each test
        await dbConnection.collection('todolists').deleteMany({});
    });

    it('/todo-lists (POST)', async () => {
        const createTodoListDto = { userId: 'user1', title: 'My Todo List' };
        return request(app.getHttpServer())
            .post('/todo-lists')
            .send(createTodoListDto)
            .expect(201)
            .then((response) => {
                expect(response.body.title).toBe('My Todo List');
                expect(response.body.userId).toBe('user1');
            });
    });

    it('/todo-lists/:userId (GET)', async () => {
        // First, create a TodoList
        const createTodoListDto = { userId: 'user1', title: 'My Todo List' };
        await request(app.getHttpServer())
            .post('/todo-lists')
            .send(createTodoListDto)
            .expect(201);

        // Now fetch the list
        return request(app.getHttpServer())
            .get('/todo-lists/user1')
            .expect(200)
            .then((response) => {
                expect(Array.isArray(response.body)).toBe(true);
                expect(response.body.length).toBe(1);
                expect(response.body[0].title).toBe('My Todo List');
            });
    });

    it('/todo-lists/:id (PUT)', async () => {
        // Create a TodoList first
        const createTodoListDto = { userId: 'user1', title: 'My Todo List' };
        const createResponse = await request(app.getHttpServer())
            .post('/todo-lists')
            .send(createTodoListDto)
            .expect(201);

        const todoListId = createResponse.body._id;

        // Now update the TodoList
        const updateTodoListDto = { title: 'Updated Todo List' };
        return request(app.getHttpServer())
            .put(`/todo-lists/${todoListId}`)
            .send(updateTodoListDto)
            .expect(200)
            .then((response) => {
                expect(response.body.title).toBe('Updated Todo List');
            });
    });

    it('/todo-lists/:id (DELETE)', async () => {
        // Create a TodoList first
        const createTodoListDto = { userId: 'user1', title: 'My Todo List' };
        const createResponse = await request(app.getHttpServer())
            .post('/todo-lists')
            .send(createTodoListDto)
            .expect(201);

        const todoListId = createResponse.body._id;

        // Now delete the TodoList
        return request(app.getHttpServer())
            .delete(`/todo-lists/${todoListId}`)
            .expect(200)
            .then(async () => {
                // Check that the list has been deleted
                const getResponse = await request(app.getHttpServer()).get(`/todo-lists/user1`);
                expect(getResponse.body.length).toBe(0);
            });
    });
});
