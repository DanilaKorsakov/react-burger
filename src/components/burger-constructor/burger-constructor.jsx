import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients }) => {
  const bun = ingredients.filter((ingredient) => ingredient.type === 'bun')[0];
  const ingredientsNoBuns = ingredients.filter(
    (ingredient) => ingredient.type !== 'bun'
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
            key={bun._id}
            // handleClose={function fee() {}}
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
            ingredientsNoBuns.map((ingredient) => (
              <div key={ingredient._id} className={styles.ingredient_drag}>
                <DragIcon type="primary" className={styles.icon_drag} />
                <ConstructorElement
                  // handleClose={function fee() {}}
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
            key={bun._id}
            // handleClose={function fee() {}}
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
            // onClick={function fee(){}}
            size="medium"
            type="primary"
          >
            Оформить заказ
          </Button>
        </div>
      ) : null}
    </section>
  );
};
