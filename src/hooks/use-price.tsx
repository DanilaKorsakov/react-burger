import { useEffect, useReducer } from 'react';

import { useSelector } from '@/hooks.ts';
import { getBun, getPickedIngredients } from '@services/burger-constructor/slice.ts';

type TUsePriceState = {
  price: number;
};

type TUsePriceAction = {
  type: 'COUNT_PRICE';
  payload: number[];
};

const initialState: TUsePriceState = {
  price: 0,
};

function priceReducer(state = initialState, action: TUsePriceAction): TUsePriceState {
  switch (action.type) {
    case 'COUNT_PRICE':
      return {
        ...state,
        price: action.payload.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        ),
      };
    default:
      return state;
  }
}

export const usePrice = (): TUsePriceState => {
  const ingredients = useSelector(getPickedIngredients);
  const bun = useSelector(getBun);
  const [state, priceDispatch] = useReducer(priceReducer, initialState);

  useEffect(() => {
    function handleCountPrice(): void {
      const prices = bun
        ? [bun.price, ...ingredients.map((item) => item.price), bun.price]
        : ingredients.map((item) => item.price);
      priceDispatch({ type: 'COUNT_PRICE', payload: prices });
    }
    handleCountPrice();
  }, [ingredients, bun]);

  return { price: state.price };
};
