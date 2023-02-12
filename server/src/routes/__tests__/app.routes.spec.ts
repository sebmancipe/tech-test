import app from '../../app';
import request from 'supertest';

describe("[app.routes]", () => {
    test('Get the application status', async () => {
        const status = await request(app).get('/');

        expect(status.statusCode).toBe(200);
        expect(status.body).toEqual({
            data: {
                serviceAvailable: true
            }
        })
    });
});