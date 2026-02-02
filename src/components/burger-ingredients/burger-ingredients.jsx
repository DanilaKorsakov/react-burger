import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ children, mainRef, bunRef, sauceRef }) => {
  const [bunActive, setBunActive] = useState(true);
  const [sauceActive, setSauceActive] = useState(false);
  const [mainActive, setMainActive] = useState(false);

  function handleScroll(elementRef) {
    elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={bunActive}
            onClick={() => {
              handleScroll(bunRef);
              setBunActive(true);
              setMainActive(false);
              setSauceActive(false);
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={mainActive}
            onClick={() => {
              handleScroll(mainRef);
              setMainActive(true);
              setSauceActive(false);
              setBunActive(false);
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={sauceActive}
            onClick={() => {
              handleScroll(sauceRef);
              setSauceActive(true);
              setMainActive(false);
              setBunActive(false);
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
