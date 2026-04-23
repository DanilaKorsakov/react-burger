import { useSelector } from '@/hooks.ts';
import { FeedOrder } from '@components/feed-order/feed-order.tsx';
import { getProfileOrders } from '@services/profile-feed/slice.ts';

import styles from './profile-feed-orders.module.css';

export const ProfileFeedOrders = (): React.JSX.Element => {
  const orders = useSelector(getProfileOrders);

  return (
    <section className={`${styles.feed_orders} `}>
      <div className={`${styles.orders_scroll} custom-scroll`}>
        {orders.orders.map((order, index) => (
          <div
            key={index}
            className={`${styles.profile_order} ${styles.order} p-6 mb-4 mr-2`}
          >
            <FeedOrder order={order} />
          </div>
        ))}
      </div>
    </section>
  );
};
