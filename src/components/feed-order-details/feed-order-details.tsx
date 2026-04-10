import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import { useSelector } from '@/hooks.ts';
import { FeedIngredient } from '@components/feed-ingredient/feed-ingredient.tsx';
import { getIngredients } from '@services/ingredients/reducer.ts';

import type { TIngredient } from '@utils/types.ts';

import styles from './feed-order-details.module.css';

type FeedOrderDetailsProps = {
  header?: string;
};

export const FeedOrderDetails = ({
  header,
}: FeedOrderDetailsProps): React.JSX.Element => {
  const ingredients: TIngredient[] = useSelector(getIngredients);

  const order = ingredients.slice(0, 8);

  return (
    <div className={styles.feed_order_details}>
      {header && (
        <div className={` ${styles.header} text text_type_digits-default mt-30`}>
          {header}
        </div>
      )}
      <div className="text text_type_main-medium mt-10 mb-3">
        Black Hole Singularity острый бургер
      </div>
      <div className={`${styles.ready} text text_type_main-default mb-15`}>Выполнен</div>
      <h2 className="text text_type_main-medium mb-6">Состав:</h2>
      <div className={`${styles.ingredients_scroll} custom-scroll mb-10`}>
        {order.map((ingredient, index) => (
          <FeedIngredient
            key={index}
            image={ingredient.image_mobile}
            name={ingredient.name}
            price={ingredient.price}
            extraClass={clsx(index !== order.length - 1 && 'mb-4')}
          />
        ))}
      </div>
      <div className={styles.order_footer}>
        <div className="text text_type_main-default text_color_inactive">
          Вчера, 13:50
        </div>
        <div className={` ${styles.price} text text_type_digits-default mb-10`}>
          {510}
          <CurrencyIcon type="primary" className="ml-2" />
        </div>
      </div>
    </div>
  );
};
