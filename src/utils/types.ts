export type TIngredient = {
  _id: string;
  name: string;
  type: 'bun' | 'sauce' | 'main';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TIngredientResponse = {
  success: boolean;
  data: TIngredient[];
};

export type TIngredientWithKey = {
  key: string;
} & TIngredient;

export type TIngredientWithOrder = {
  order: number;
} & TIngredientWithKey;

export type TIngredientDrag = {
  sourceIndex: number;
  destinationIndex: number;
  ingredient: TIngredientWithOrder;
};

export type TIngredientDrop = {
  index: number;
  ingredient: TIngredientWithOrder;
};

export type TOrder = {
  name: string;
  order: {
    number: number | null;
  };
};

export type TOrderResponse = {
  success: boolean;
} & TOrder;

export type TFormValues = {
  email: string;
  name: string;
  password: string;
  code: string;
};

export type TProfileFormValues = {
  name: string | undefined;
  email: string | undefined;
  profilePassword: string | undefined;
};

export type TUser = {
  email: string;
  name: string;
};

export type TUserResponse = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export type TResponseWithoutUserInfo = {
  success: boolean;
  message: string;
};
