import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useReducer, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { ConstructorIngredient } from '@components/constructor-ingredient/constructor-ingredient.jsx';
import Modal from '@components/modal/modal.jsx';
import OrderDetails from '@components/order-details/order-details.jsx';
import { useModal } from '@hooks/useModal.jsx';
import {
  addBun,
  addIngredient,
  getBun,
  getPickedIngredients,
} from '@services/burger-constructor/reducer.js';
import { createOrder } from '@services/order-details/actions.js';

import styles from './burger-constructor.module.css';

const initialState = {
  price: 0,
};

function priceReducer(state = initialState, action) {
  switch (action.type) {
    case 'COUNT_PRICE':
      return {
        ...state,
        price: action.payload.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        ),
      };
    default:
      return state;
  }
}

export const BurgerConstructor = () => {
  const ingredients = useSelector(getPickedIngredients);
  const bun = useSelector(getBun);
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();

  const [state, priceDispatch] = useReducer(priceReducer, initialState);

  useEffect(() => {
    function handleCountPrice() {
      const prices = bun
        ? [bun.price, ...ingredients.map((item) => item.price), bun.price]
        : ingredients.map((item) => item.price);
      priceDispatch({ type: 'COUNT_PRICE', payload: prices });
    }
    handleCountPrice();
  }, [ingredients, bun]);

  const [{ highlightedIngredient }, ingredientDrop] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      highlightedIngredient: monitor.canDrop(),
    }),
    drop: (ingredient) => {
      dispatch(addIngredient(ingredient));
    },
  });

  const [{ highlightedBun }, bunDrop] = useDrop({
    accept: 'bun',
    collect: (monitor) => ({
      highlightedBun: monitor.canDrop(),
    }),
    drop: (bun) => {
      dispatch(addBun(bun));
    },
  });

  return (
    <section className={`${styles.burger_constructor} ml-10`}>
      <div ref={bunDrop} className="ml-4">
        {bun ? (
          <ConstructorElement
            key={bun.key + 'top'}
            price={bun.price}
            text={bun.name + ' (верх)'}
            thumbnail={bun.image}
            type="top"
            isLocked={true}
            extraClass={`ml-8 mb-4`}
          />
        ) : (
          <div
            className={`${styles.ingredient_substrate} ${clsx(highlightedBun && styles.highlight)} constructor-element constructor-element_pos_top mb-4 ml-8`}
          >
            Выберите булки
          </div>
        )}
        <div ref={ingredientDrop} className={`${styles.ingredients} custom-scroll`}>
          {ingredients.length > 0 ? (
            <ul className={`${styles.ingredientsList}`}>
              {ingredients.map((ingredient, index) => (
                <li key={ingredient.key}>
                  <ConstructorIngredient ingredient={ingredient} index={index} />
                </li>
              ))}
            </ul>
          ) : (
            <div
              className={`${styles.ingredient_substrate} ${clsx(highlightedIngredient && styles.highlight)} constructor-element mb-4 ml-8`}
            >
              Выберите начинку
            </div>
          )}
        </div>
        {bun ? (
          <ConstructorElement
            key={bun.key + 'bottom'}
            price={bun.price}
            text={bun.name + ' (низ)'}
            thumbnail={bun.image}
            type="bottom"
            isLocked={true}
            extraClass={`ml-8`}
          />
        ) : (
          <div
            className={`${styles.ingredient_substrate} ${clsx(highlightedBun && styles.highlight)} constructor-element constructor-element_pos_bottom ml-8`}
          >
            Выберите булки
          </div>
        )}
      </div>
      <div className={`${styles.order_details} mt-10`}>
        <div className={`${styles.price} mr-10`}>
          <div className="text text_type_main-large">{state.price}</div>
          <CurrencyIcon type="primary" className={`${styles.icon_price} ml-2`} />
        </div>
        <Button
          disabled={!bun}
          onClick={function fee() {
            const ingredientsIds = bun
              ? [bun._id, ...ingredients.map((item) => item._id), bun._id]
              : ingredients.map((item) => item._id);
            dispatch(createOrder(ingredientsIds));
            openModal();
          }}
          size="medium"
          type="primary"
        >
          Оформить заказ
        </Button>
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
