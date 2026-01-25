import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './ingredient.module.css';

function Ingredient({ image, price, name }) {
  return (
    <>
      <Counter count={1} size="default" />
      <img src={`${image}`} alt="ingredient" className="pr-4 pl-4" />
      <div className={`${styles.currency} mt-1 mb-1`}>
        <span className="text text_type_digits-default mr-2">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.name} text text_type_main-default`}>{name}</div>
    </>
  );
}

export default Ingredient;
