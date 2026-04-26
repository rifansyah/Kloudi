import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { useForm } from '../useForm';

interface TestValues {
  email: string;
  password: string;
}

const initialValues: TestValues = { email: '', password: '' };

interface FormRef {
  values: TestValues;
  errors: Partial<Record<keyof TestValues | 'server', string>>;
  handleChange: (field: keyof TestValues, value: string) => void;
  handleSubmit: () => Promise<void>;
  setFieldError: (field: keyof TestValues, message: string) => void;
  setServerError: (message: string) => void;
  reset: () => void;
}

function Consumer({
  onState,
  validate,
  onSubmit,
}: {
  onState: (state: FormRef) => void;
  validate?: (values: TestValues) => Partial<Record<keyof TestValues | 'server', string>>;
  onSubmit: (values: TestValues) => Promise<void> | void;
}) {
  const form = useForm<TestValues>({ initialValues, validate, onSubmit });
  onState(form as unknown as FormRef);
  return null;
}

describe('useForm', () => {
  describe('handleChange', () => {
    it('updates field value', async () => {
      const ref = { current: null as FormRef | null };
      await ReactTestRenderer.act(async () => {
        ReactTestRenderer.create(
          <Consumer
            onState={(s) => { ref.current = s; }}
            onSubmit={async () => {}}
          />,
        );
      });

      await ReactTestRenderer.act(async () => {
        ref.current!.handleChange('email', 'user@test.com');
      });

      expect(ref.current!.values.email).toBe('user@test.com');
    });

    it('clears field error on change', async () => {
      const ref = { current: null as FormRef | null };
      await ReactTestRenderer.act(async () => {
        ReactTestRenderer.create(
          <Consumer
            onState={(s) => { ref.current = s; }}
            onSubmit={async () => {}}
          />,
        );
      });

      await ReactTestRenderer.act(async () => {
        ref.current!.setFieldError('email', 'Invalid email');
      });
      expect(ref.current!.errors.email).toBe('Invalid email');

      await ReactTestRenderer.act(async () => {
        ref.current!.handleChange('email', 'x');
      });
      expect(ref.current!.errors.email).toBeUndefined();
    });

    it('clears server error on change', async () => {
      const ref = { current: null as FormRef | null };
      await ReactTestRenderer.act(async () => {
        ReactTestRenderer.create(
          <Consumer
            onState={(s) => { ref.current = s; }}
            onSubmit={async () => {}}
          />,
        );
      });

      await ReactTestRenderer.act(async () => {
        ref.current!.setServerError('Server failed');
      });
      expect(ref.current!.errors.server).toBe('Server failed');

      await ReactTestRenderer.act(async () => {
        ref.current!.handleChange('email', 'x');
      });
      expect(ref.current!.errors.server).toBeUndefined();
    });
  });

  describe('handleSubmit', () => {
    it('calls onSubmit with current values when validation passes', async () => {
      const ref = { current: null as FormRef | null };
      const submitted: TestValues[] = [];

      await ReactTestRenderer.act(async () => {
        ReactTestRenderer.create(
          <Consumer
            onState={(s) => { ref.current = s; }}
            onSubmit={async (values) => { submitted.push(values); }}
          />,
        );
      });

      await ReactTestRenderer.act(async () => {
        ref.current!.handleChange('email', 'user@test.com');
        ref.current!.handleChange('password', 'secret');
      });

      await ReactTestRenderer.act(async () => {
        await ref.current!.handleSubmit();
      });

      expect(submitted).toHaveLength(1);
      expect(submitted[0]).toEqual({ email: 'user@test.com', password: 'secret' });
    });

    it('sets validation errors and skips onSubmit when validation fails', async () => {
      const ref = { current: null as FormRef | null };
      const submitted: TestValues[] = [];

      await ReactTestRenderer.act(async () => {
        ReactTestRenderer.create(
          <Consumer
            onState={(s) => { ref.current = s; }}
            validate={(values) =>
              values.email ? {} : { email: 'Email required' }
            }
            onSubmit={async (values) => { submitted.push(values); }}
          />,
        );
      });

      await ReactTestRenderer.act(async () => {
        await ref.current!.handleSubmit();
      });

      expect(ref.current!.errors.email).toBe('Email required');
      expect(submitted).toHaveLength(0);
    });

    it('sets server error when onSubmit throws', async () => {
      const ref = { current: null as FormRef | null };

      await ReactTestRenderer.act(async () => {
        ReactTestRenderer.create(
          <Consumer
            onState={(s) => { ref.current = s; }}
            onSubmit={async () => { throw new Error('Network error'); }}
          />,
        );
      });

      await ReactTestRenderer.act(async () => {
        await ref.current!.handleSubmit();
      });

      expect(ref.current!.errors.server).toBe('Network error');
    });

    it('sets generic server error for non-Error throws', async () => {
      const ref = { current: null as FormRef | null };

      await ReactTestRenderer.act(async () => {
        ReactTestRenderer.create(
          <Consumer
            onState={(s) => { ref.current = s; }}
            onSubmit={async () => { throw 'oops'; }}
          />,
        );
      });

      await ReactTestRenderer.act(async () => {
        await ref.current!.handleSubmit();
      });

      expect(ref.current!.errors.server).toBe('Something went wrong');
    });
  });

  describe('setFieldError', () => {
    it('sets error for specific field', async () => {
      const ref = { current: null as FormRef | null };
      await ReactTestRenderer.act(async () => {
        ReactTestRenderer.create(
          <Consumer
            onState={(s) => { ref.current = s; }}
            onSubmit={async () => {}}
          />,
        );
      });

      await ReactTestRenderer.act(async () => {
        ref.current!.setFieldError('password', 'Too short');
      });

      expect(ref.current!.errors.password).toBe('Too short');
      expect(ref.current!.errors.email).toBeUndefined();
    });
  });

  describe('setServerError', () => {
    it('sets server error without touching field errors', async () => {
      const ref = { current: null as FormRef | null };
      await ReactTestRenderer.act(async () => {
        ReactTestRenderer.create(
          <Consumer
            onState={(s) => { ref.current = s; }}
            onSubmit={async () => {}}
          />,
        );
      });

      await ReactTestRenderer.act(async () => {
        ref.current!.setFieldError('email', 'Bad email');
        ref.current!.setServerError('Server down');
      });

      expect(ref.current!.errors.email).toBe('Bad email');
      expect(ref.current!.errors.server).toBe('Server down');
    });
  });

  describe('reset', () => {
    it('restores initial values and clears all errors', async () => {
      const ref = { current: null as FormRef | null };
      await ReactTestRenderer.act(async () => {
        ReactTestRenderer.create(
          <Consumer
            onState={(s) => { ref.current = s; }}
            onSubmit={async () => {}}
          />,
        );
      });

      await ReactTestRenderer.act(async () => {
        ref.current!.handleChange('email', 'user@test.com');
        ref.current!.setFieldError('email', 'Some error');
        ref.current!.setServerError('Server error');
      });

      await ReactTestRenderer.act(async () => {
        ref.current!.reset();
      });

      expect(ref.current!.values).toEqual(initialValues);
      expect(ref.current!.errors).toEqual({});
    });
  });
});
