import { useLocation } from 'react-router-dom';

import { useSelector } from '@/hooks.ts';
import { FeedOrder } from '@components/feed-order/feed-order.tsx';
import { getIngredients } from '@services/ingredients/reducer.ts';

import type { TIngredient } from '@utils/types.ts';

import styles from './feed-orders.module.css';

export const FeedOrders = (): React.JSX.Element => {
  const ingredients: TIngredient[] = useSelector(getIngredients);
  const location = useLocation();

  const orders = [
    ingredients.slice(0, 5),
    ingredients.slice(0, 8),
    ingredients.slice(0, 3),
    ingredients.slice(0, 8),
    ingredients.slice(0, 3),
  ];

  return (
    <section className={`${styles.feed_orders} `}>
      <div className={`${styles.orders_scroll} custom-scroll`}>
        {orders.map((order, index) =>
          location.pathname == '/feed' ? (
            <div key={index} className={`${styles.order} p-6 mb-4 mr-2`}>
              <FeedOrder order={order} />
            </div>
          ) : (
            location.pathname == '/profile/orders' && (
              <div
                key={index}
                className={`${styles.profile_order} ${styles.order} p-6 mb-4 mr-2`}
              >
                <FeedOrder order={order} />
              </div>
            )
          )
        )}
      </div>
    </section>
  );
};
