import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ children, bunRef, sauceRef, mainRef }) => {
  const [value, setValue] = useState('bun');

  function handleScroll(elementRef) {
    elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleValue(value) {
    setValue(value);
  }

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={value === 'bun'}
            onClick={(value) => {
              handleScroll(bunRef);
              handleValue(value);
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={value === 'main'}
            onClick={(value) => {
              handleScroll(mainRef);
              handleValue(value);
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={value === 'sauce'}
            onClick={(value) => {
              handleScroll(sauceRef);
              handleValue(value);
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>

      <div className={`${styles.ingredients} mt-10 custom-scroll`}>{children}</div>
    </section>
  );
};
