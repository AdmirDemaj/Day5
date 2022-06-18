
const setupTestEnv = require('./setupTestEnv')

const app = setupTestEnv();

describe("Integretion tests for CRUD operations connected to test postgres ", () => {

    test("Should create an todo via POST route", async() => {
        const todo = {
            name: 'Test todo 2',
            description: 'This is a test todo',
            //gross_amount: 20,
            
        };
        const response = await app.inject({
            method: "POST",
            url: "/v2",
            payload: todo,
        });

        expext(response.statusCode).toBe(201)
        expect(response.json()).toMatchObject(todo)
    });


    test('Should get all ToDos', async () => {
        const response = await app.inject({
            method: 'GET',
            url : '/v2',
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toMatchObject([{
            description:'This is an test',
            name: 'Test ToDo',
        },
    ]);
    });


    test('Should get a single ToDo by Id', async () => {
        const response = await app.inject({
            method : 'GET',
            url: '/v2/1',
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toMatchObject([{
            description: 'This is an test',
            name: 'Test ToDo',
           },
         ]);
        });

        test('Should update a ToDo based on Id', async() => {
            const todo = {
                name: 'Updated ToDo',
                description: 'This ToDo is updated',
            };

            const response = await app.inject({
                method: 'PUT',
                url: '/v2/2',
                payload: todo
            });
            expect(response.statusCode).toBe(200);
            expect(response.json()).toEqual(objectContaining(todo));

        });

        test('Should delete an ToDo based on Id', async () => {
            const response = await app.inject({
                method: 'DELETE',
                url: '/v2/3'
            });

            expect(response.statusCode).toBe(200);
            expect(response).toMatchObject({
                body: 'Item with id 3 has been deleted',
            });
});

    });

