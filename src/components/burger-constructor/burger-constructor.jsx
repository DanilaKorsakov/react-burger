import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState, useMemo } from 'react';

import Modal from '@components/modal/modal';
import OrderDetails from '@components/order-details/order-details';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients }) => {
  const [visible, setVisible] = useState(false);

  function handleOpenModal() {
    setVisible(true);
  }

  function handleCloseModal() {
    setVisible(false);
  }

  const bun = ingredients.filter((ingredient) => ingredient.type === 'bun')[0];
  const ingredientsNoBuns = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type !== 'bun'),
    [ingredients]
  );

  const [price, setPrice] = useState(0);

  useEffect(() => {
    let prices = 0;
    ingredients.forEach((ingredient) => {
      if (ingredient.type !== 'bun') {
        prices += ingredient.price;
      } else {
        prices += ingredient.price * 2;
      }
    });
    setPrice(prices);
  }, [ingredients]);

  return (
    <section className={`${styles.burger_constructor} ml-10`}>
      <div className="ml-4">
        {bun && (
          <ConstructorElement
            key={bun._id + 'top'}
            price={bun.price}
            text={bun.name + ' (верх)'}
            thumbnail={bun.image}
            type="top"
            isLocked={true}
            extraClass={` ${styles.ingredient} ml-8 mb-4`}
          />
        )}
        <div className={`${styles.ingredients} custom-scroll`}>
          {ingredientsNoBuns &&
            ingredientsNoBuns.map((ingredient, index) => (
              <div key={ingredient._id + index} className={styles.ingredient_drag}>
                <DragIcon type="primary" className={styles.icon_drag} />
                <ConstructorElement
                  price={ingredient.price}
                  text={ingredient.name}
                  thumbnail={ingredient.image}
                  type="normal"
                  isLocked={false}
                  extraClass={` ${styles.ingredient} ml-2 mb-4`}
                />
              </div>
            ))}
        </div>
        {bun && (
          <ConstructorElement
            key={bun._id + 'bottom'}
            price={bun.price}
            text={bun.name + ' (низ)'}
            thumbnail={bun.image}
            type="bottom"
            isLocked={true}
            extraClass={` ${styles.ingredient} ml-8`}
          />
        )}
      </div>
      {price ? (
        <div className={`${styles.order_details} mt-10`}>
          <div className={`${styles.price} mr-10`}>
            <div className="text text_type_main-large">{price}</div>
            <CurrencyIcon type="primary" className={`${styles.icon_price} ml-2`} />
          </div>
          <Button
            onClick={function fee() {
              handleOpenModal();
            }}
            size="medium"
            type="primary"
          >
            Оформить заказ
          </Button>
        </div>
      ) : null}
      {visible && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
