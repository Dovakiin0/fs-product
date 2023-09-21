import supertest from "supertest";
import prisma from "../../config/prismaClient";
import products from "../../data/products";
import app from "../../server";

describe("Products", () => {
  beforeAll(async () => {
    await prisma.product.createMany({ data: products });
  });

  afterAll(async () => {
    await prisma.product.deleteMany();
    await prisma.$disconnect();
  });

  it("GET /api/products - Should return List of products", async () => {
    const response = await supertest(app).get("/api/products");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
