import { useSelector } from '@/hooks.ts';
import { FeedOrder } from '@components/feed-order/feed-order.tsx';
import { getOrders } from '@services/feed/reducer.ts';

import styles from './feed-orders.module.css';

export const FeedOrders = (): React.JSX.Element => {
  const orders = useSelector(getOrders);

  return (
    <section className={`${styles.feed_orders} `}>
      <div className={`${styles.orders_scroll} custom-scroll`}>
        {orders.orders.map((order) => (
          <div key={order._id} className={`${styles.order} p-6 mb-4 mr-2`}>
            <FeedOrder order={order} />
          </div>
        ))}
      </div>
    </section>
  );
};
