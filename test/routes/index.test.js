const app = require('../../app');
const supertest = require('supertest');
const request = supertest(app);

describe('Test the test endpoint in the index file', () => {
    it('should test that the endpoint returns "test"', async () => {
        const response = await request.get('/test');
        expect(response.status).toBe(200);
        expect(response.text).toBe('test');
    });
});
