import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from '@/hooks.ts';
import { getOrders } from '@services/feed/reducer.ts';

import type { TFeedOrder } from '@utils/types.ts';

type TUseOrder = {
  order?: TFeedOrder;
};

export const useOrder = (): TUseOrder => {
  const orders = useSelector(getOrders).orders;

  const { id } = useParams();
  const order = useMemo<TFeedOrder | undefined>(() => {
    return orders.find((order) => order._id.toString() === id?.toString());
  }, [id, orders]);

  return { order };
};
