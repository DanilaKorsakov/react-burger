const PWD_REGEX = /^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]{6,}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,4}$/;
const NAME_REGEX = /^[A-Za-zА-Яа-яЁё0-9\s-]{1,}$/;

export type ValidatorKeys = 'name' | 'email' | 'password' | 'code';

type Validator = {
  validator: (value: string) => boolean;
  message: string;
};

type Validators = Record<ValidatorKeys, Validator>;

export const validators: Validators = {
  name: {
    validator: (value) => !!(value && NAME_REGEX.test(value.trim())),
    message: 'Укажите корректное имя.',
  },
  email: {
    validator: (value) => EMAIL_REGEX.test(value.trim()),
    message: 'Укажите корректный email.',
  },
  password: {
    validator: (value) => PWD_REGEX.test(value.trim()),
    message: 'Укажите корректный пароль.',
  },
  code: {
    validator: (value) => !!(value && value.trim().length > 35),
    message: 'Введите код из письма.',
  },
};
