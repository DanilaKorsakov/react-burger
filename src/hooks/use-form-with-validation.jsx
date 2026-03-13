import { useState } from 'react';

import { validators } from '@utils/validators.js';

export const useFormWithValidation = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initErrors(initialValues));
  const [errorsText, setErrorsText] = useState(initErrorsText(initialValues));
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const input = e.target;
    const value = input.value;
    const name = input.name;
    const hasValidator = name in validators;

    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);

    const newErrors = {
      ...errors,
      [name]: hasValidator ? value && !validators[name]?.validator(value) : false,
    };
    setErrors(newErrors);

    const newErrorsText = {
      ...errorsText,
      [name]: hasValidator
        ? validators[name]?.validator(value)
          ? ''
          : validators[name]?.message
        : '',
    };

    setErrorsText(newErrorsText);

    const formIsNotValid = Object.keys(values).some(
      (key) => (newValues[key] === '' && key !== 'profilePassword') || newErrors[key]
    );
    setIsValid(!formIsNotValid);
  };

  const handleRevert = (e) => {
    e.preventDefault();
    setValues(initialValues);
  };

  return { values, errors, errorsText, isValid, handleChange, handleRevert };
};

function initErrors(formValues) {
  return Object.keys(formValues).reduce((errors, fieldName) => {
    errors[fieldName] = false;
    return errors;
  }, {});
}

function initErrorsText(formValues) {
  return Object.keys(formValues).reduce((errorsText, fieldName) => {
    errorsText[fieldName] = '';
    return errorsText;
  }, {});
}
