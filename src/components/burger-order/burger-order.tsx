import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import { useSelector } from '@/hooks.ts';
import { usePrice } from '@hooks/use-price.tsx';
import { getBun } from '@services/burger-constructor/reducer.ts';

import styles from './burger-order.module.css';

type BurgerOrderProps = {
  handleClick: () => void;
};

export const BurgerOrder = ({ handleClick }: BurgerOrderProps): React.JSX.Element => {
  const { price } = usePrice();
  const bun = useSelector(getBun);
  return (
    <div className={`${styles.order_details} mt-10`}>
      <div className={`${styles.price} mr-10`}>
        <div className="text text_type_main-large">{price}</div>
        <CurrencyIcon type="primary" className={`${styles.icon_price} ml-2`} />
      </div>
      <Button
        disabled={!bun}
        onClick={handleClick}
        size="medium"
        type="primary"
        htmlType={'button'}
      >
        Оформить заказ
      </Button>
    </div>
  );
};
