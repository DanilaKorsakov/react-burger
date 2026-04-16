import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';

import { useDispatch, useSelector } from '@/hooks.ts';
import { FeedOrders } from '@components/feed-orders/feed-orders.tsx';
import { FeedStatus } from '@components/feed-status/feed-status.tsx';
import { wsConnect, wsDisconnect } from '@services/feed/actions.ts';
import { getLoading, getOrders } from '@services/feed/reducer.ts';
import { FEED_URL } from '@services/middleware/socket-middlware.ts';

import styles from './feed-page.module.css';

export const FeedPage = (): React.JSX.Element => {
  const isLoading = useSelector(getLoading);
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);

  useEffect(() => {
    dispatch(wsConnect(FEED_URL));

    return (): void => {
      dispatch(wsDisconnect());
    };
  }, []);

  return (
    <>
      {orders.orders.length > 0 ? (
        <>
          <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
            Лента заказов
          </h1>
          <div className={styles.feed}>
            <FeedOrders />
            <FeedStatus />
          </div>
        </>
      ) : (
        isLoading && <Preloader />
      )}
    </>
  );
};
