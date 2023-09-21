import { User, Product, Order } from "@prisma/client";

type OmitedUser = Omit<User, "password">;

export { User, Product, Order, OmitedUser };
