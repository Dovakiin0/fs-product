import products from "../src/data/products";
import prisma from "../src/config/prismaClient";

async function main() {
  await seedProducts();
}

async function seedProducts() {
  await prisma.product.createMany({
    data: products,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
