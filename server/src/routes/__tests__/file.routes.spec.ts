import app from '../../app';
import request from 'supertest';

describe("[file.routes]", () => {
    test('Parse a local PDF file to text', async () => {
        const buffer = Buffer.from('a-dummy-text');

        const status = await request(app).post('/convert-to-text').attach('file', buffer, 'filename');

        expect(status.statusCode).toBe(200);
        expect(status.body).toEqual({
            data: "a-dummy-text"
        })
    });

    test('Throw error when file is not provided in the request', async () => {
        const status = await request(app).post('/convert-to-text').send({});

        expect(status.statusCode).toBe(200);
        expect(status.body).toEqual({
            data: "No file provided"
        })
    });
});