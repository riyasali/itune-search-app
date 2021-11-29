import request from 'supertest';
import app from '../src/server';
describe("GET /itunes/search/:artist", () => {
    test("Search endpoint should return data with success 200", async () => {
        await request(app).get("/itunes/search/beyonce")
            .expect(200)
            .then(async (response) => {
                expect(response).toHaveProperty('body');
                expect(response.body).toHaveProperty('resultCount');
                expect(response.body).toHaveProperty('results');
                expect(response.body).toHaveProperty('message');
                expect(Array.isArray(response.body.results)).toBeTruthy();
            });
    });
    test("Search endpoint should return 400, if artist parameter is invalid", async () => {
        await request(app).get("/itunes/search/^^^^")
            .expect(400)
            .then(async (response) => {
                console.log(response.body);
                expect(response).toHaveProperty('body');
                expect(response.body.message).toEqual('Bad Request. Invalid artist name');
            });
    });
    test("Search endpoint should return 400, if artist is not provided", async () => {
        await request(app).get("/itunes/search/")
            .expect(400)
            .then(async (response) => {
                console.log(response.body);
                expect(response).toHaveProperty('body');
                expect(response.body.message).toEqual('Bad Request. Artist name is required');
            });
    });
});