import { type ChangeEvent, useState } from 'react';

import { type ValidatorKeys, validators } from '@/utils/validators.ts';

export type Errors<T> = Record<keyof T, boolean>;
export type ErrorsText<T> = Record<keyof T, string>;

type useFormWithValidationType<T extends object> = {
  values: T;
  errors: Errors<T>;
  errorsText: ErrorsText<T>;
  isValid: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRevert: () => void;
};

export const useFormWithValidation = <T extends object>(
  initialValues: T
): useFormWithValidationType<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>(initErrors<T>(initialValues));
  const [errorsText, setErrorsText] = useState<ErrorsText<T>>(
    initErrorsText<T>(initialValues)
  );
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = e.target;
    const value = input.value;
    const name = input.name as keyof T;
    const hasValidator = name in validators;

    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);

    const newErrors = {
      ...errors,
      [name]: hasValidator
        ? value && !validators[name as ValidatorKeys]?.validator(value)
        : false,
    };
    setErrors(newErrors);

    const newErrorsText = {
      ...errorsText,
      [name]: hasValidator
        ? validators[name as ValidatorKeys]?.validator(value)
          ? ''
          : validators[name as ValidatorKeys]?.message
        : '',
    };

    setErrorsText(newErrorsText);

    const formIsNotValid = Object.keys(values).some(
      (key) => (newValues[key] === '' && key !== 'profilePassword') || newErrors[key]
    );
    setIsValid(!formIsNotValid);
  };

  const handleRevert = (): void => {
    setValues(initialValues);
  };

  return { values, errors, errorsText, isValid, handleChange, handleRevert };
};

function initErrors<T extends object>(formValues: T): Errors<T> {
  return Object.keys(formValues).reduce((errors, fieldName) => {
    errors[fieldName as keyof T] = false;
    return errors;
  }, {} as Errors<T>);
}

function initErrorsText<T extends object>(formValues: T): ErrorsText<T> {
  return Object.keys(formValues).reduce((errorsText, fieldName) => {
    errorsText[fieldName as keyof T] = '';
    return errorsText;
  }, {} as ErrorsText<T>);
}
