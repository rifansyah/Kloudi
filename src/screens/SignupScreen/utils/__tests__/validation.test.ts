import { validate } from "../validation";

// Mock the validators to ensure predictable behavior
jest.mock("@utils/validators", () => ({
  isValidEmail: jest.fn((email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ),
  isValidPassword: jest.fn((password: string) => password.length >= 6),
  isValidName: jest.fn((name: string) => name.trim().length > 0),
}));

// Mock the strings to return the key for easy assertions
jest.mock("../../strings", () => (key: string) => key);

describe("validate", () => {
  describe("valid inputs", () => {
    it("returns no errors when all fields are valid", () => {
      const values = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };
      const result = validate(values);
      expect(result).toEqual({});
    });
  });

  describe("name validation", () => {
    it("returns name error when name is empty", () => {
      const values = {
        name: "",
        email: "john@example.com",
        password: "password123",
      };
      const result = validate(values);
      expect(result).toEqual({ name: "nameRequired" });
    });

    it("returns name error when name contains only whitespace", () => {
      const values = {
        name: "   ",
        email: "john@example.com",
        password: "password123",
      };
      const result = validate(values);
      expect(result).toEqual({ name: "nameRequired" });
    });
  });

  describe("email validation", () => {
    it("returns email required error when email is empty", () => {
      const values = {
        name: "John Doe",
        email: "",
        password: "password123",
      };
      const result = validate(values);
      expect(result).toEqual({ email: "emailRequired" });
    });

    it("returns email required error when email contains only whitespace", () => {
      const values = {
        name: "John Doe",
        email: "   ",
        password: "password123",
      };
      const result = validate(values);
      expect(result).toEqual({ email: "emailRequired" });
    });

    it("returns invalid email error when email format is incorrect", () => {
      const values = {
        name: "John Doe",
        email: "invalid-email",
        password: "password123",
      };
      const result = validate(values);
      expect(result).toEqual({ email: "invalidEmail" });
    });

    it("returns invalid email error when email is missing @ symbol", () => {
      const values = {
        name: "John Doe",
        email: "johnexample.com",
        password: "password123",
      };
      const result = validate(values);
      expect(result).toEqual({ email: "invalidEmail" });
    });

    it("returns invalid email error when email is missing domain", () => {
      const values = {
        name: "John Doe",
        email: "john@",
        password: "password123",
      };
      const result = validate(values);
      expect(result).toEqual({ email: "invalidEmail" });
    });

    it("accepts valid email format", () => {
      const values = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };
      const result = validate(values);
      expect(result).not.toHaveProperty("email");
    });

    it("trims whitespace from email before validation", () => {
      const values = {
        name: "John Doe",
        email: "  john@example.com  ",
        password: "password123",
      };
      const result = validate(values);
      expect(result).not.toHaveProperty("email");
    });
  });

  describe("password validation", () => {
    it("returns password required error when password is empty", () => {
      const values = {
        name: "John Doe",
        email: "john@example.com",
        password: "",
      };
      const result = validate(values);
      expect(result).toEqual({ password: "passwordRequired" });
    });

    it("returns password too short error when password is less than 6 characters", () => {
      const values = {
        name: "John Doe",
        email: "john@example.com",
        password: "12345",
      };
      const result = validate(values);
      expect(result).toEqual({ password: "passwordTooShort" });
    });

    it("accepts password with exactly 6 characters", () => {
      const values = {
        name: "John Doe",
        email: "john@example.com",
        password: "123456",
      };
      const result = validate(values);
      expect(result).not.toHaveProperty("password");
    });

    it("accepts password longer than 6 characters", () => {
      const values = {
        name: "John Doe",
        email: "john@example.com",
        password: "longpassword",
      };
      const result = validate(values);
      expect(result).not.toHaveProperty("password");
    });
  });

  describe("multiple validation errors", () => {
    it("returns all errors when all fields are invalid", () => {
      const values = {
        name: "",
        email: "invalid",
        password: "123",
      };
      const result = validate(values);
      expect(result).toEqual({
        name: "nameRequired",
        email: "invalidEmail",
        password: "passwordTooShort",
      });
    });

    it("returns name and email errors when both are invalid", () => {
      const values = {
        name: "",
        email: "invalid",
        password: "validpass",
      };
      const result = validate(values);
      expect(result).toEqual({
        name: "nameRequired",
        email: "invalidEmail",
      });
    });

    it("returns email and password errors when both are invalid", () => {
      const values = {
        name: "John Doe",
        email: "",
        password: "123",
      };
      const result = validate(values);
      expect(result).toEqual({
        email: "emailRequired",
        password: "passwordTooShort",
      });
    });
  });

  describe("edge cases", () => {
    it("returns all required errors when all fields are empty", () => {
      const values = {
        name: "",
        email: "",
        password: "",
      };
      const result = validate(values);
      expect(result).toEqual({
        name: "nameRequired",
        email: "emailRequired",
        password: "passwordRequired",
      });
    });

    it("handles special characters in valid email", () => {
      const values = {
        name: "John Doe",
        email: "john.doe+test@example.com",
        password: "password123",
      };
      const result = validate(values);
      expect(result).not.toHaveProperty("email");
    });
  });
});
