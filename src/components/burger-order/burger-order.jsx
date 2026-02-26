import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import { usePrice } from '@hooks/usePrice.jsx';
import { getBun } from '@services/burger-constructor/reducer.js';

import styles from './burger-order.module.css';

export const BurgerOrder = ({ handleClick }) => {
  const { price } = usePrice();
  const bun = useSelector(getBun);
  return (
    <div className={`${styles.order_details} mt-10`}>
      <div className={`${styles.price} mr-10`}>
        <div className="text text_type_main-large">{price}</div>
        <CurrencyIcon type="primary" className={`${styles.icon_price} ml-2`} />
      </div>
      <Button disabled={!bun} onClick={handleClick} size="medium" type="primary">
        Оформить заказ
      </Button>
    </div>
  );
};
