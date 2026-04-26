import { getPasswordStrength, isValidEmail, isValidName, isValidPassword } from '../validators';

describe('isValidEmail', () => {
  it('returns true for valid emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.co')).toBe(true);
  });

  it('returns false for invalid emails', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('notanemail')).toBe(false);
    expect(isValidEmail('missing@domain')).toBe(false);
    expect(isValidEmail('@nodomain.com')).toBe(false);
    expect(isValidEmail('spaces @example.com')).toBe(false);
  });

  it('trims whitespace before validating', () => {
    expect(isValidEmail('  user@example.com  ')).toBe(true);
  });
});

describe('isValidPassword', () => {
  it('returns true for passwords with 6+ characters', () => {
    expect(isValidPassword('abcdef')).toBe(true);
    expect(isValidPassword('longpassword123')).toBe(true);
  });

  it('returns false for passwords under 6 characters', () => {
    expect(isValidPassword('')).toBe(false);
    expect(isValidPassword('abc')).toBe(false);
    expect(isValidPassword('abcde')).toBe(false);
  });
});

describe('isValidName', () => {
  it('returns true for non-empty names after trim', () => {
    expect(isValidName('John')).toBe(true);
    expect(isValidName('  Jane  ')).toBe(true);
  });

  it('returns false for empty or whitespace-only names', () => {
    expect(isValidName('')).toBe(false);
    expect(isValidName('   ')).toBe(false);
  });
});

describe('getPasswordStrength', () => {
  it('returns empty string for 0-2 characters', () => {
    expect(getPasswordStrength('')).toBe('');
    expect(getPasswordStrength('ab')).toBe('');
  });

  it('returns weak for 3-5 characters', () => {
    expect(getPasswordStrength('abc')).toBe('weak');
    expect(getPasswordStrength('abcde')).toBe('weak');
  });

  it('returns fair for 6-8 characters', () => {
    expect(getPasswordStrength('abcdef')).toBe('fair');
    expect(getPasswordStrength('abcdefgh')).toBe('fair');
  });

  it('returns strong for 9+ characters', () => {
    expect(getPasswordStrength('abcdefghi')).toBe('strong');
    expect(getPasswordStrength('verylongpassword')).toBe('strong');
  });
});
