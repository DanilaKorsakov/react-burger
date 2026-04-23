import { nanoid } from '@reduxjs/toolkit';

import {
  addBun,
  addIngredient,
  burgerConstructorSlice,
  changeIngredientPlace,
  changeIngredientsOrder,
  deleteIngredient,
  deleteIngredients,
  initialState,
  revertIngredientPlaces,
  type TBurgerConstructor,
} from '@services/burger-constructor/slice.ts';

import type { MockedFunction } from 'vitest';

import type { TIngredient, TIngredientWithOrder } from '@utils/types.ts';

vi.mock('@reduxjs/toolkit', async () => {
  const actual = await vi.importActual('@reduxjs/toolkit');
  return {
    ...actual,
    nanoid: vi.fn(),
  };
});

describe('BurgerConstructor slice tests', () => {
  const ingredient: TIngredient = {
    _id: '60666c42cc7b410027a1a9b5',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    __v: 0,
  };

  const bun: TIngredient = {
    _id: '60666c42cc7b410027a1a9b1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
  };

  const dragIngredient: TIngredientWithOrder = {
    _id: '60666c42cc7b410027a1a9b5',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    __v: 0,
    order: 0,
    key: 'key-1',
  };

  const dropIngredient: TIngredientWithOrder = {
    _id: '60666c42cc7b410027a1a9b7',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0,
    order: 1,
    key: 'key-2',
  };

  beforeEach(() => {
    (nanoid as MockedFunction<typeof nanoid>).mockReturnValue('key');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return initial state', () => {
    expect(burgerConstructorSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('should add ingredient to BurgerConstructor', () => {
    expect(
      burgerConstructorSlice.reducer(initialState, addIngredient(ingredient))
    ).toEqual({
      ...initialState,
      ingredients: [
        {
          ...ingredient,
          key: 'key',
          order: 0,
        },
      ],
      order: 1,
    });
  });

  it('should add bun to BurgerConstructor', () => {
    expect(burgerConstructorSlice.reducer(initialState, addBun(bun))).toEqual({
      ...initialState,
      bun: {
        ...bun,
        key: 'key',
      },
    });
  });

  it('should delete ingredient from BurgerConstructor', () => {
    const previousState = {
      ...initialState,
      ingredients: [dragIngredient],
      order: 1,
    };

    expect(
      burgerConstructorSlice.reducer(previousState, deleteIngredient(dragIngredient.key))
    ).toEqual({
      ...initialState,
      ingredients: [],
      order: 0,
    });
  });

  it('should change ingredients place after DND', () => {
    const previousState = {
      bun: null,
      ingredients: [dragIngredient, dropIngredient],
      order: 2,
    };

    const payload = {
      sourceIndex: 0,
      destinationIndex: 1,
      ingredient: dragIngredient,
    };

    expect(
      burgerConstructorSlice.reducer(previousState, changeIngredientPlace(payload))
    ).toEqual({
      ...previousState,
      ingredients: [dropIngredient, dragIngredient],
    });
  });

  it('should change ingredients order after DND', () => {
    const previousState = {
      bun: null,
      ingredients: [dropIngredient, dragIngredient],
      order: 2,
    };

    expect(
      burgerConstructorSlice.reducer(previousState, changeIngredientsOrder())
    ).toEqual({
      ...previousState,
      ingredients: [
        { ...dropIngredient, order: 0 },
        { ...dragIngredient, order: 1 },
      ],
    });
  });

  it('should update order of ingredients after delete', () => {
    let previousState: TBurgerConstructor = {
      bun: null,
      ingredients: [dragIngredient, dropIngredient],
      order: 2,
    };

    previousState = burgerConstructorSlice.reducer(
      previousState,
      deleteIngredient(dragIngredient.key)
    );

    expect(previousState.ingredients).toHaveLength(1);

    expect(
      burgerConstructorSlice.reducer(previousState, changeIngredientsOrder())
    ).toEqual({
      ...previousState,
      ingredients: [{ ...dropIngredient, order: 0 }],
      order: 1,
    });
  });

  it('should revert ingredients places if ingredient was dropped outside BurgerConstructor', () => {
    let previousState: TBurgerConstructor = {
      bun: null,
      ingredients: [dragIngredient, dropIngredient],
      order: 2,
    };

    const payload = {
      sourceIndex: 0,
      destinationIndex: 1,
      ingredient: dragIngredient,
    };

    const revertPayload = {
      index: 1,
      ingredient: dragIngredient,
    };

    previousState = burgerConstructorSlice.reducer(
      previousState,
      changeIngredientPlace(payload)
    );

    expect(previousState).toEqual({
      ...previousState,
      ingredients: [dropIngredient, dragIngredient],
    });

    expect(
      burgerConstructorSlice.reducer(
        previousState,
        revertIngredientPlaces(revertPayload)
      )
    ).toEqual({
      ...previousState,
      ingredients: [dragIngredient, dropIngredient],
    });
  });

  it('should delete all ingredients and bun and assign an order number to 0', () => {
    expect(burgerConstructorSlice.reducer(initialState, deleteIngredients())).toEqual(
      initialState
    );
  });
});
