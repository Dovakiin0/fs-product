import {
  comparePwd,
  generateJWT,
  hashPassword,
  verifyJWT,
} from "../helper/util";

describe("Unit Test", () => {
  let password: string = "HelloWorld";
  let id: number = 101;
  let token: string;
  let hashedPassword: string;

  describe("JWT", () => {
    it("Should generate JWT token", () => {
      token = generateJWT(id);
      expect(typeof token).toBe("string");
    });

    it("Should verify the token and return the decoded token", () => {
      const decoded = verifyJWT(token);
      expect(decoded).not.toBe(null);
      expect(decoded?.id).toBe(101);
    });
  });

  describe("Hash", () => {
    it("Should hash password and return the hashed string", () => {
      hashedPassword = hashPassword(password);
      expect(typeof hashedPassword).toBe("string");
    });

    it("Should return compare password with hashedPassword and return boolean", () => {
      const compare = comparePwd(password, hashedPassword);
      expect(typeof compare).toBe("boolean");
    });
  });
});
