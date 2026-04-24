import { useSelector } from '@/hooks.ts';
import { getOrders } from '@services/feed/slice.ts';

type UseFeedOrders = {
  doneOrders: number[];
  workOrders: number[];
};

export const UseFeedOrders = (): UseFeedOrders => {
  const orders = useSelector(getOrders);

  const doneOrders = orders.orders
    .filter((order) => order.status === 'done')
    .map((order) => order.number);

  const workOrders = orders.orders
    .filter((order) => order.status !== 'done')
    .map((order) => order.number);

  return { doneOrders, workOrders };
};
