import { FeedOrders } from '@components/feed-orders/feed-orders.tsx';
import { FeedStatus } from '@components/feed-status/feed-status.tsx';

import styles from './feed-page.module.css';

export const FeedPage = (): React.JSX.Element => {
  return (
    <>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
        Лента заказов
      </h1>
      <div className={styles.feed}>
        <FeedOrders />
        <FeedStatus />
      </div>
    </>
  );
};
