import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types.ts';

import styles from './feed-ingredient.module.css';

type FeedIngredientProps = {
  divStyles?: {
    left: string;
    zIndex: number;
  };
  image: TIngredient['image_mobile'];
  counter?: number;
  name?: TIngredient['name'];
  price?: TIngredient['price'];
  extraClass?: string;
};

export const FeedIngredient = ({
  divStyles,
  image,
  name,
  price,
  counter,
  extraClass,
}: FeedIngredientProps): React.JSX.Element => {
  return (
    <div className={`${styles.ingredient} ${extraClass}`}>
      <div className={styles.left_side}>
        <div className={styles.ingredient_icon} style={divStyles}>
          <img src={image} alt="" className={styles.ingredient_image} />
          {counter && (
            <>
              <div className={`${styles.ingredient_counter} text text_type_main-small`}>
                +{counter}
              </div>
              <div className={styles.counter_background}></div>
            </>
          )}
        </div>
        {name && (
          <div className={` ${styles.name} text text_type_main-default ml-4`}>
            {name}
          </div>
        )}
      </div>
      {price && (
        <div className={` ${styles.price} text text_type_main-default ml-4 mr-6`}>
          1 x {price}
          <CurrencyIcon type="primary" className={`${styles.icon_price} ml-2`} />
        </div>
      )}
    </div>
  );
};
