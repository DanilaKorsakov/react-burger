import { useLayoutEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from '@/hooks.ts';
import { getOrders } from '@services/feed/reducer.ts';
import { getOrder } from '@utils/api.ts';

import type { TFeedOrder } from '@utils/types.ts';

type TUseOrder = {
  order?: TFeedOrder;
};

export const useOrder = (): TUseOrder => {
  const orders = useSelector(getOrders).orders;
  const { id } = useParams();
  const [order, setOrder] = useState<TFeedOrder | undefined>(undefined);

  const existingOrder = useMemo<TFeedOrder | undefined>(() => {
    return orders.find((order) => order._id.toString() === id?.toString());
  }, []);

  useLayoutEffect(() => {
    if (existingOrder) {
      setOrder(existingOrder);
      return;
    }
    if (id) {
      getOrder(id).then((fetchedOrder: TFeedOrder) => {
        setOrder(fetchedOrder);
      });
    }
  });

  return { order };
};
