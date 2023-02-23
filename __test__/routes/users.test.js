import app from '../../app';
import request from 'supertest';
import prisma from '../../prismaClient';


beforeAll(async () => {
    // create users
    await prisma.user.createMany({
        data: [{name: 'piewewk',email: 'pi@pi.com'}, {name: 'joe',email: 'joe@biden.com'}]
    });
    console.log('✨ 2 user successfully created in the database ✨')

    // create 
}); 

afterAll(async () => {
    const deleteUsers = prisma.user.deleteMany();
    await prisma.$transaction([deleteUsers]);
    await prisma.$disconnect();
});

describe('Test creating a user', () => {
    test('It should create a user', async () => {
        const user = {
            name: 'piewewk',
            email: 'piwewek@test.com'
        };
        const response = await request(app).post('/api/users').send(user);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', user.name);
        expect(response.body).toHaveProperty('email', user.email);
    });
});
            
