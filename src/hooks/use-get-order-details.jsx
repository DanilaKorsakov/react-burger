import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  deleteIngredients,
  getBun,
  getPickedIngredients,
} from '@services/burger-constructor/reducer.js';
import { createOrder } from '@services/order-details/actions.js';
import { getOrder } from '@services/order-details/reducer.js';

export const useGetOrderDetails = () => {
  const order = useSelector(getOrder);
  const dispatch = useDispatch();
  const ingredients = useSelector(getPickedIngredients);
  const bun = useSelector(getBun);

  useLayoutEffect(() => {
    const ingredientsIds = bun
      ? [bun._id, ...ingredients.map((item) => item._id), bun._id]
      : ingredients.map((item) => item._id);
    dispatch(createOrder(ingredientsIds));
  }, []);

  useEffect(() => {
    if (order) {
      dispatch(deleteIngredients());
    }
  }, [order]);

  return { order };
};
