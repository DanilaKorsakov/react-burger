import { useEffect, useLayoutEffect } from 'react';

import { useDispatch, useSelector } from '@/hooks.ts';
import {
  deleteIngredients,
  getBun,
  getPickedIngredients,
} from '@services/burger-constructor/reducer.ts';
import { createOrder } from '@services/order-details/actions.js';
import { getOrder } from '@services/order-details/reducer.js';

import type { TOrder } from '@utils/types.ts';

export const useGetOrderDetails = (): Pick<TOrder, 'order'> => {
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
