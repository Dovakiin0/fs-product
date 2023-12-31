import prisma from "../../config/prismaClient";
import app from "../../server";
import supertest from "supertest";
import { hashPassword } from "../../helper/util";
import { User } from "../../types";

describe("Authentication", () => {
  let user: User;
  beforeAll(async () => {
    let hashPwd = hashPassword("test");
    user = await prisma.user.create({
      data: {
        email: "test@test.com",
        password: hashPwd,
        username: "Dovakiin0",
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
  });

  it("POST /login - should return 200 and JWT if user is authenticated", async () => {
    let payload = {
      email: "test@test.com",
      password: "test",
    };
    const res = await supertest(app).post("/api/auth").send(payload);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("POST /login - should return 400 if user is not found or incorrect credentials", async () => {
    let payload = {
      email: "test@notest.com",
      password: "idkokay",
    };
    const res = await supertest(app).post("/api/auth").send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Incorrect Email or Password");
  });

  it("POST /register - should return 201 if user is registered", async () => {
    let payload = {
      email: "test@new.com",
      password: "newpwd",
      username: "newUser",
    };
    const res = await supertest(app).post("/api/auth/register").send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  it("POST /register - should return 409 if user is already registered", async () => {
    let payload = {
      email: "test@test.com",
      password: "test",
    };
    const res = await supertest(app).post("/api/auth/register").send(payload);
    expect(res.status).toBe(409);
    expect(res.body.message).toBe("User already Exists");
  });
});
