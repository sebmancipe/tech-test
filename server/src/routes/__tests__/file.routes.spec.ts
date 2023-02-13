import app from '../../app';
import request from 'supertest';

describe("[file.routes]", () => {
    test('Parse a local PDF file to text', async () => {
        const buffer = Buffer.from('a-dummy-text');

        const status = await request(app).post('/convert-to-text')
            .set({
                "Authorization": "Basic " + Buffer.from("testing-user:testing-secret").toString("base64"),
            })
            .attach('file', buffer, 'filename.pdf');

        expect(status.statusCode).toBe(200);
        expect(status.body).toEqual({
            data: "a-dummy-text"
        })
    });

    test('Throw error when file is not provided in the request', async () => {
        const status = await request(app).post('/convert-to-text')
            .set({"Authorization": "Basic " + Buffer.from("testing-user:testing-secret").toString("base64")})
            .send({});

        expect(status.statusCode).toBe(200);
        expect(status.body).toEqual({
            data: "Not a valid file provided"
        })
    });

    test('Throw unauthorized error when user is not authorized', async () => {
        const status = await request(app).post('/convert-to-text')
            .set({"Authorization": "Basic " + Buffer.from("not-a-valid-user:not-a-valid-secret").toString("base64")})
            .send({});

        expect(status.statusCode).toBe(401);
    });
});