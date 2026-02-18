import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IngredientDetails from '@components/ingredient-details/ingredient-details';
import Ingredient from '@components/ingredient/ingredient.jsx';
import IngredientList from '@components/ingredients-list/ingredients-list';
import Modal from '@components/modal/modal';
import { deleteIngredientDetails, getIngredient } from '@services/ingredient/reducer.js';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  const dispatch = useDispatch();
  const ingredient = useSelector(getIngredient);

  const [value, setValue] = useState('bun');

  const [visible, setVisible] = useState(false);

  const ingredientsScrollRef = useRef(undefined);
  const mainRef = useRef(undefined);
  const bunRef = useRef(undefined);
  const sauceRef = useRef(undefined);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = customScroll.getBoundingClientRect().top;
      const bunsTop = bunRef.current.getBoundingClientRect().top - scrollTop;
      const mainsTop = mainRef.current.getBoundingClientRect().top - scrollTop;
      const saucesTop = sauceRef.current.getBoundingClientRect().top - scrollTop;

      if (-bunsTop < mainsTop) {
        setValue('bun');
      } else if (-mainsTop < saucesTop) {
        setValue('main');
      } else {
        setValue('sauce');
      }
    }
    const customScroll = ingredientsScrollRef.current;
    customScroll.addEventListener('scroll', handleScroll);
    return () => {
      customScroll.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleOpenModal() {
    setVisible(true);
  }

  function handleCloseModal() {
    setVisible(false);
    dispatch(deleteIngredientDetails());
  }

  const buns = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === 'bun'),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === 'sauce'),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === 'main'),
    [ingredients]
  );

  function handleScroll(elementRef) {
    elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={value === 'bun'}
            onClick={() => {
              handleScroll(bunRef);
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={value === 'main'}
            onClick={() => {
              handleScroll(mainRef);
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={value === 'sauce'}
            onClick={() => {
              handleScroll(sauceRef);
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>

      <div
        ref={ingredientsScrollRef}
        className={`${styles.ingredients} mt-10 custom-scroll`}
      >
        <IngredientList name="Булки" ingredients={buns} ref={bunRef}>
          {(ingredient) => {
            return <Ingredient ingredient={ingredient} onOpenModal={handleOpenModal} />;
          }}
        </IngredientList>
        <IngredientList name="Начинки" ingredients={mains} ref={mainRef}>
          {(ingredient) => {
            return <Ingredient ingredient={ingredient} onOpenModal={handleOpenModal} />;
          }}
        </IngredientList>
        <IngredientList name="Соусы" ingredients={sauces} ref={sauceRef}>
          {(ingredient) => {
            return <Ingredient ingredient={ingredient} onOpenModal={handleOpenModal} />;
          }}
        </IngredientList>
      </div>

      {visible && (
        <Modal onClose={handleCloseModal}>
          <IngredientDetails
            image={ingredient.image}
            name={ingredient.name}
            calories={ingredient.calories}
            proteins={ingredient.proteins}
            fat={ingredient.fat}
            carbohydrates={ingredient.carbohydrates}
          />
        </Modal>
      )}
    </section>
  );
};
