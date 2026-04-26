import { useCallback, useState } from "react";

type Errors<T> = Partial<Record<keyof T | "server", string>>;

interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Errors<T>;
  onSubmit: (values: T) => Promise<void> | void;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});

  const handleChange = useCallback((field: keyof T, value: any) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
      server: undefined,
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (validate) {
      const validationErrors = validate(values);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    try {
      await onSubmit(values);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      setErrors((prev) => ({
        ...prev,
        server: message,
      }));
    }
  }, [values, validate, onSubmit]);

  const setFieldError = useCallback((field: keyof T, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  }, []);

  const setServerError = useCallback((message: string) => {
    setErrors((prev) => ({
      ...prev,
      server: message,
    }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldError,
    setServerError,
    reset,
  };
}
