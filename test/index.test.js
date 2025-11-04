import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe("index route", () => {
    //lancer le serveur express
    it("should return home page", async () => {
        const reponse = await request(app).get("/");
        expect(reponse.text).toBe("Home");
    });
    //fais ue requet sur "/"

    //verifie que la reponse est " home"
});