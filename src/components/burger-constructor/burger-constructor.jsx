import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients }) => {
  const bun = ingredients.filter((ingredient) => ingredient.type === 'bun')[0];

  return (
    <section className={`${styles.burger_constructor} ml-10`}>
      <div className={`${styles.constructor_elements} ml-4`}>
        {bun && (
          <ConstructorElement
            key={bun._id}
            // handleClose={function fee() {}}
            price={bun.price}
            text={bun.name}
            thumbnail={bun.image}
            type="top"
            isLocked={true}
            extraClass="mb-4"
          />
        )}
        {ingredients &&
          ingredients.map(
            (ingredient) =>
              ingredient.type !== 'bun' && (
                <ConstructorElement
                  key={ingredient._id}
                  // handleClose={function fee() {}}
                  price={ingredient.price}
                  text={ingredient.name}
                  thumbnail={ingredient.image}
                  type="normal"
                  isLocked={false}
                  extraClass="mb-4"
                />
              )
          )}
        {bun && (
          <ConstructorElement
            key={bun._id}
            // handleClose={function fee() {}}
            price={bun.price}
            text={bun.name}
            thumbnail={bun.image}
            type="bottom"
            isLocked={true}
            extraClass=""
          />
        )}
      </div>
      <div className={styles.order_details}>
        <div className={`${styles.price} mr-10`}>
          <div className="text text_type_main-large">610</div>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          // onClick={function fee(){}}
          size="medium"
          type="primary"
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
