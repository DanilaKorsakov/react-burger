import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import styles from './ingredient.module.css';

function Ingredient({ onAddPickedIngredients, ingredient, hasBun }) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    onAddPickedIngredients(ingredient);
    if (!hasBun) {
      setCount(count + 1);
    } else if (hasBun && ingredient.type !== 'bun') {
      setCount(count + 1);
    }
  };

  return (
    <div onClick={handleClick}>
      {count ? <Counter count={count} size="default" /> : null}
      <img src={`${ingredient.image}`} alt="ingredient" className="pr-4 pl-4" />
      <div className={`${styles.currency} mt-1 mb-1`}>
        <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.name} text text_type_main-default`}>
        {ingredient.name}
      </div>
    </div>
  );
}

export default Ingredient;
