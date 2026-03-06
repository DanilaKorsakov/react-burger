import { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';

import { getBun, getPickedIngredients } from '@services/burger-constructor/reducer.js';

const initialState = {
  price: 0,
};

function priceReducer(state = initialState, action) {
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

export const usePrice = () => {
  const ingredients = useSelector(getPickedIngredients);
  const bun = useSelector(getBun);
  const [state, priceDispatch] = useReducer(priceReducer, initialState);

  useEffect(() => {
    function handleCountPrice() {
      const prices = bun
        ? [bun.price, ...ingredients.map((item) => item.price), bun.price]
        : ingredients.map((item) => item.price);
      priceDispatch({ type: 'COUNT_PRICE', payload: prices });
    }
    handleCountPrice();
  }, [ingredients, bun]);

  return { price: state.price };
};
