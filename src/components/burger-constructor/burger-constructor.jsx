import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { BurgerOrder } from '@components/burger-order/burger-order.jsx';
import { ConstructorIngredient } from '@components/constructor-ingredient/constructor-ingredient.jsx';
import {
  addBun,
  addIngredient,
  getBun,
  getPickedIngredients,
} from '@services/burger-constructor/reducer.js';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const ingredients = useSelector(getPickedIngredients);
  const navigate = useNavigate();
  const bun = useSelector(getBun);
  const dispatch = useDispatch();
  const location = useLocation();

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

  function handleClick() {
    navigate('/order', { state: { modalFrom: location } });
  }

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

      <BurgerOrder handleClick={handleClick} />
    </section>
  );
};
