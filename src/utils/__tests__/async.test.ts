import { delay } from '../async';

describe('delay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('resolves after specified milliseconds', async () => {
    let resolved = false;
    delay(1000).then(() => {
      resolved = true;
    });

    expect(resolved).toBe(false);
    jest.advanceTimersByTime(999);
    await Promise.resolve();
    expect(resolved).toBe(false);

    jest.advanceTimersByTime(1);
    await Promise.resolve();
    expect(resolved).toBe(true);
  });

  it('resolves immediately with 0ms', async () => {
    let resolved = false;
    delay(0).then(() => {
      resolved = true;
    });

    jest.advanceTimersByTime(0);
    await Promise.resolve();
    expect(resolved).toBe(true);
  });

  it('returns a Promise', () => {
    const result = delay(100);
    expect(result).toBeInstanceOf(Promise);
    jest.runAllTimers();
  });
});
