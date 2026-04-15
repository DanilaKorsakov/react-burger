import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import { FeedIngredient } from '@components/feed-ingredient/feed-ingredient.tsx';
import { useFormatDate } from '@hooks/use-format-date.tsx';
import { useIngredientsCount } from '@hooks/use-ingredients-count.tsx';
import { useOrderPrice } from '@hooks/use-order-price.tsx';
import { useOrder } from '@hooks/use-order.tsx';

import styles from './feed-order-details.module.css';

type FeedOrderDetailsProps = {
  hasHeader?: boolean;
};

export const FeedOrderDetails = ({
  hasHeader,
}: FeedOrderDetailsProps): React.JSX.Element => {
  const { order } = useOrder();
  const { price } = useOrderPrice(order);
  const { ingredientsCount } = useIngredientsCount(order);
  const ingredientsIds = [...new Set(order?.ingredients)];
  const { formatDate } = useFormatDate(order?.createdAt || '');

  return (
    <>
      {order && (
        <div className={styles.feed_order_details}>
          {hasHeader && (
            <div className={` ${styles.header} text text_type_digits-default mt-30`}>
              #{order.number}
            </div>
          )}
          <div className="text text_type_main-medium mt-10 mb-3">{order?.name}</div>
          {order?.status === 'done' ? (
            <div className={`${styles.ready} text text_type_main-default mb-15`}>
              Выполнен
            </div>
          ) : order?.status === 'pending' ? (
            <div className={`text text_type_main-default mb-15`}>Готовится</div>
          ) : (
            <div className={`text text_type_main-default mb-15`}>Создан</div>
          )}
          <h2 className="text text_type_main-medium mb-6">Состав:</h2>
          <div className={`${styles.ingredients_scroll} custom-scroll mb-10`}>
            {ingredientsIds.map((ingredientId, index) => (
              <FeedIngredient
                key={ingredientId}
                id={ingredientId}
                count={ingredientsCount?.get(ingredientId)}
                extraClass={clsx(index !== ingredientsIds.length - 1 && 'mb-4')}
              />
            ))}
          </div>
          <div className={styles.order_footer}>
            <div className="text text_type_main-default text_color_inactive">
              {formatDate}
            </div>
            <div className={` ${styles.price} text text_type_digits-default mb-10`}>
              {price}
              <CurrencyIcon type="primary" className="ml-2" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
