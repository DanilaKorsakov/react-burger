import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

import { FeedIngredient } from '@components/feed-ingredient/feed-ingredient.tsx';

import type { TIngredient } from '@utils/types.ts';

import styles from './feed-order.module.css';

type FeedOrderProps = {
  order: TIngredient[];
};

export const FeedOrder = ({ order }: FeedOrderProps): React.JSX.Element => {
  const location = useLocation();

  return (
    <Link to={`/feed/1`} state={{ modalFrom: location }} className={styles.link}>
      <div className={`${styles.order_flex} mb-6`}>
        <div className="text text_type_digits-default">#034535</div>
        <div className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20
        </div>
      </div>
      <div className="text text_type_main-medium mb-6">
        Death Star Starship Main бургер
      </div>
      <div className={styles.order_flex}>
        <div className={styles.ingredients}>
          {order.slice(0, 5).map((ingredient, index) => (
            <FeedIngredient
              key={index}
              image={ingredient.image_mobile}
              divStyles={{
                left: `${-16 * index}px`,
                zIndex: order.length - index,
              }}
            />
          ))}
          {order.length > 5 && (
            <FeedIngredient
              image={order[5].image_mobile}
              divStyles={{
                left: `${-16 * 5}px`,
                zIndex: order.length - 5,
              }}
              counter={order.length - 5}
            />
          )}
        </div>
        <div className={styles.order_price}>
          <div className="text text_type_digits-default mr-2">560</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};
