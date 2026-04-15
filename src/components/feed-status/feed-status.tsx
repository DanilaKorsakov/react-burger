import { useSelector } from '@/hooks.ts';
import { UseFeedOrders } from '@hooks/use-feed-orders.tsx';
import { getOrders } from '@services/feed/reducer.ts';

import styles from './feed-status.module.css';

export const FeedStatus = (): React.JSX.Element => {
  const orders = useSelector(getOrders);
  const { doneOrders, workOrders } = UseFeedOrders();

  return (
    <section className={`${styles.feed_status} ml-15`}>
      <div className={`${styles.orders_ids} mb-15`}>
        <div className="mr-9">
          <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
          <div className={styles.columns}>
            <div className="mr-4">
              {doneOrders.slice(0, 5).map((orderNumber, index) => (
                <div
                  key={index}
                  className={`${styles.ready} text text_type_digits-default mb-2`}
                >
                  {orderNumber}
                </div>
              ))}
            </div>
            <div>
              {doneOrders.length > 5 &&
                doneOrders.slice(5, 10).map((orderNumber, index) => (
                  <div
                    key={index}
                    className={`${styles.ready} text text_type_digits-default mb-2`}
                  >
                    {orderNumber}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text text_type_main-medium mb-6">В работе:</h2>
          <div className={styles.columns}>
            <div className="mr-4">
              {workOrders.slice(0, 5).map((orderNumber, index) => (
                <div key={index} className={`text text_type_digits-default mb-2`}>
                  {orderNumber}
                </div>
              ))}
            </div>
            <div>
              {workOrders.length > 5 &&
                workOrders.slice(5, 10).map((orderNumber, index) => (
                  <div key={index} className={`text text_type_digits-default mb-2`}>
                    {orderNumber}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
      <div className={` ${styles.blur} text text_type_digits-large`}>{orders.total}</div>

      <h2 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h2>
      <div className={` ${styles.blur} text text_type_digits-large`}>
        {orders.totalToday}
      </div>
    </section>
  );
};
