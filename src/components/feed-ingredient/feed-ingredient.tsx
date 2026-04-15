import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import { useIngredient } from '@hooks/use-ingredient.tsx';

import styles from './feed-ingredient.module.css';

type FeedIngredientProps = {
  id: string;
  divStyles?: {
    left: string;
    zIndex: number;
  };
  counter?: number;
  extraClass?: string;
  onlyImage?: boolean;
  count?: number;
};

export const FeedIngredient = ({
  divStyles,
  id,
  counter,
  extraClass,
  count,
  onlyImage = false,
}: FeedIngredientProps): React.JSX.Element => {
  const { ingredient } = useIngredient(id);
  return (
    <div className={`${styles.ingredient} ${extraClass}`}>
      <div className={styles.left_side}>
        <div className={styles.ingredient_icon} style={divStyles}>
          <img
            src={ingredient?.image_mobile}
            alt={ingredient?.name}
            className={styles.ingredient_image}
          />
          {counter && (
            <>
              <div className={`${styles.ingredient_counter} text text_type_main-small`}>
                +{counter}
              </div>
              <div className={styles.counter_background}></div>
            </>
          )}
        </div>
        {!onlyImage && (
          <div className={` ${styles.name} text text_type_main-default ml-4`}>
            {ingredient?.name}
          </div>
        )}
      </div>
      {!onlyImage && (
        <div className={` ${styles.price} text text_type_main-default ml-4 mr-6`}>
          {count} x {ingredient?.price}
          <CurrencyIcon type="primary" className={`${styles.icon_price} ml-2`} />
        </div>
      )}
    </div>
  );
};
