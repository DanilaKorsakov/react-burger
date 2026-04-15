import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

import { FeedIngredient } from '@components/feed-ingredient/feed-ingredient.tsx';
import { useFormatDate } from '@hooks/use-format-date.tsx';
import { useOrderPrice } from '@hooks/use-order-price.tsx';

import type { TFeedOrder } from '@utils/types.ts';

import styles from './feed-order.module.css';

type FeedOrderProps = {
  order: TFeedOrder;
};

export const FeedOrder = ({ order }: FeedOrderProps): React.JSX.Element => {
  const location = useLocation();
  const ingredientsIds = [...new Set(order.ingredients)];
  const { price } = useOrderPrice(order);
  const { formatDate } = useFormatDate(order.createdAt);

  return (
    <Link
      to={`/feed/${order._id}`}
      state={{ modalFrom: location }}
      className={styles.link}
    >
      <div className={`${styles.order_flex} mb-6`}>
        <div className="text text_type_digits-default">#{order.number}</div>
        <div className="text text_type_main-default text_color_inactive">
          {formatDate}
        </div>
      </div>
      <div className="text text_type_main-medium mb-2">{order.name}</div>
      {location.pathname == '/profile/orders' &&
        (order?.status === 'done' ? (
          <div className={`${styles.ready} text text_type_main-default mb-6`}>
            Выполнен
          </div>
        ) : order?.status === 'pending' ? (
          <div className={`text text_type_main-default mb-6`}>Готовится</div>
        ) : (
          <div className={`text text_type_main-default mb-6`}>Создан</div>
        ))}
      <div className={styles.order_flex}>
        <div className={styles.ingredients}>
          {ingredientsIds.slice(0, 5).map((id, index) => (
            <FeedIngredient
              key={id}
              id={id}
              onlyImage
              divStyles={{
                left: `${-16 * index}px`,
                zIndex: ingredientsIds.length - index,
              }}
            />
          ))}
          {ingredientsIds.length > 5 && (
            <FeedIngredient
              id={ingredientsIds[5]}
              onlyImage
              divStyles={{
                left: `${-16 * 5}px`,
                zIndex: ingredientsIds.length - 5,
              }}
              counter={ingredientsIds.length - 5}
            />
          )}
        </div>
        <div className={styles.order_price}>
          <div className="text text_type_digits-default mr-2">{price}</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};
