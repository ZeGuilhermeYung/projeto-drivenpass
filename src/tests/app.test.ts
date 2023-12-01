import supertest from "supertest";
import { User } from "@prisma/client";

import { createUser } from "./factory/userFactory"

import app from "@/app.js";

let token = {};
let user: User;
let cardId : number = 0;

describe("/POST sign-up", () => {
  it("should return status code 409 trying to add existing user", async () => {
    const newTestUser = await createUser();
    user = newTestUser;

    let sendUser : Partial<User> = {...user};
    delete sendUser.id;

    const response = await supertest(app).post("/sign-up").send(sendUser);

    expect(response.status).toBe(409);
  })
})

describe("POST /sign-in", () => {
  it("should return status code 200", async () => {

    const response = await supertest(app).post("/sign-in").send({ email: user.email, password: user.password })

    token = response.body.token;

    expect(response.status).toBe(200);
  })
})