import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import styles from './ingredient-ui.module.css';

export const IngredientUi = ({ count, dragRef, id, name, price, image, location }) => {
  return (
    <Link
      ref={dragRef}
      to={`/ingredients/${id}`}
      className={styles.ingredient}
      state={{ modalFrom: location }}
    >
      {count ? <Counter count={count} size="default" /> : null}
      <img src={image} alt={name} className="pr-4 pl-4" />
      <div className={`${styles.currency} mt-1 mb-1`}>
        <span className="text text_type_digits-default mr-2">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.name} text text_type_main-default`}>{name}</div>
    </Link>
  );
};
