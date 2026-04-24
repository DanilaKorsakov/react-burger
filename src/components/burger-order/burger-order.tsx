import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import { useSelector } from '@/hooks.ts';
import { usePrice } from '@hooks/use-price.tsx';
import { getBun } from '@services/burger-constructor/slice.ts';

import styles from './burger-order.module.css';

type BurgerOrderProps = {
  handleClick: (() => void) | ((e: React.SyntheticEvent) => void) | undefined;
};

export const BurgerOrder = ({ handleClick }: BurgerOrderProps): React.JSX.Element => {
  const { price } = usePrice();
  const bun = useSelector(getBun);
  return (
    <div className={`${styles.order_details} mt-10`} data-testid="create-order">
      <div className={`${styles.price} mr-10`}>
        <div className="text text_type_main-large" data-testid={`order-price`}>
          {price}
        </div>
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
