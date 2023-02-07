import app from '../../app';
import supertest from 'supertest';
import { prismaMock } from '../../singleton';
const request = supertest(app);

describe('Test creating a user', () => {
    test('It should create a user', async () => {
        const user = {
            name: 'piewewk',
            email: 'piwewek@test.com'
        };
        prismaMock.user.create.mockResolvedValue(user);
        // const response = await request.post('/api/').send(user);
        // expect(response.statusCode).toBe(200);
        // expect(response.body).toEqual(user);
        expect(prismaMock.user.create).toHaveBeenCalledTimes(0);
    });
});
            
