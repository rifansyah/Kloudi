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
        email: "john@example.com",
        password: "password123",
      };
      const result = validate(values);
      expect(result).toEqual({});
    });
  });

  describe("email validation", () => {
    it("returns email required error when email is empty", () => {
      const values = {
        email: "",
        password: "password123",
      };
      const result = validate(values);
      expect(result).toEqual({ email: "emailRequired" });
    });

    it("returns email required error when email contains only whitespace", () => {
      const values = {
        email: "   ",
        password: "password123",
      };
      const result = validate(values);
      expect(result).toEqual({ email: "emailRequired" });
    });

    it("returns invalid email error when email format is incorrect", () => {
      const values = {
        email: "invalid-email",
        password: "password123",
      };
      const result = validate(values);
      expect(result).toEqual({ email: "invalidEmail" });
    });

    it("returns invalid email error when email is missing @ symbol", () => {
      const values = {
        email: "johnexample.com",
        password: "password123",
      };
      const result = validate(values);
      expect(result).toEqual({ email: "invalidEmail" });
    });

    it("returns invalid email error when email is missing domain", () => {
      const values = {
        email: "john@",
        password: "password123",
      };
      const result = validate(values);
      expect(result).toEqual({ email: "invalidEmail" });
    });

    it("accepts valid email format", () => {
      const values = {
        email: "john@example.com",
        password: "password123",
      };
      const result = validate(values);
      expect(result).not.toHaveProperty("email");
    });

    it("trims whitespace from email before validation", () => {
      const values = {
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
        email: "john@example.com",
        password: "",
      };
      const result = validate(values);
      expect(result).toEqual({ password: "passwordRequired" });
    });

    it("accepts non-empty password", () => {
      const values = {
        email: "john@example.com",
        password: "12345",
      };
      const result = validate(values);
      expect(result).not.toHaveProperty("password");
    });

    it("accepts password longer than 6 characters", () => {
      const values = {
        email: "john@example.com",
        password: "longpassword",
      };
      const result = validate(values);
      expect(result).not.toHaveProperty("password");
    });
  });

  describe("multiple validation errors", () => {
    it("returns email and password errors when both are invalid", () => {
      const values = {
        email: "",
        password: "",
      };
      const result = validate(values);
      expect(result).toEqual({
        email: "emailRequired",
        password: "passwordRequired",
      });
    });

    it("returns only email error when email is invalid and password is valid", () => {
      const values = {
        email: "invalid",
        password: "validpass",
      };
      const result = validate(values);
      expect(result).toEqual({
        email: "invalidEmail",
      });
    });

    it("returns only password error when password is empty and email is valid", () => {
      const values = {
        email: "john@example.com",
        password: "",
      };
      const result = validate(values);
      expect(result).toEqual({
        password: "passwordRequired",
      });
    });
  });

  describe("edge cases", () => {
    it("returns all required errors when all fields are empty", () => {
      const values = {
        email: "",
        password: "",
      };
      const result = validate(values);
      expect(result).toEqual({
        email: "emailRequired",
        password: "passwordRequired",
      });
    });

    it("handles special characters in valid email", () => {
      const values = {
        email: "john.doe+test@example.com",
        password: "password123",
      };
      const result = validate(values);
      expect(result).not.toHaveProperty("email");
    });
  });
});
