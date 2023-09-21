import supertest from "supertest";
import prisma from "../../config/prismaClient";
import products from "../../data/products";
import app from "../../server";
import { generateJWT, hashPassword } from "../../helper/util";
import { Product, User } from "@prisma/client";

describe("Orders", () => {
  let user: User;
  let token: string;
  let product: Product;
  beforeAll(async () => {
    let hashPwd = hashPassword("test");
    user = await prisma.user.create({
      data: {
        email: "test2@test.com",
        password: hashPwd,
        username: "Dovakiin0",
      },
    });

    token = generateJWT(user.id);

    product = await prisma.product.create({ data: products[0] });
    let quantity = 3;
    await prisma.order.create({
      data: {
        userId: user.id,
        productId: product.id,
        quantity: quantity,
        totalPrice: product.price * quantity,
      },
    });
  });

  afterAll(async () => {
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it("GET /api/orders - Should return List of products", async () => {
    const response = await supertest(app).get("/api/orders");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("POST /api/orders = Should create orders", async () => {
    const response = await supertest(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        carts: [
          {
            productId: product.id,
            quantity: 3,
            total: product.price * 3,
          },
        ],
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("success");
  });
});
