import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { type RefObject, useEffect, useMemo, useRef, useState } from 'react';

import { useSelector } from '@/hooks.ts';
import { IngredientList } from '@components/ingredients-list/ingredients-list.tsx';
import { getIngredients } from '@services/ingredients/reducer.js';

import type { TIngredient } from '@utils/types.ts';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
  const ingredients = useSelector(getIngredients);

  const [value, setValue] = useState<string>('bun');

  const ingredientsScrollRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLHeadingElement | null>(null);
  const bunRef = useRef<HTMLHeadingElement | null>(null);
  const sauceRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    function handleScroll(): void {
      const scrollTop: number = customScroll
        ? customScroll.getBoundingClientRect().top
        : 0;

      if (bunRef.current && mainRef.current && sauceRef.current) {
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
    }
    const customScroll = ingredientsScrollRef.current;
    customScroll?.addEventListener('scroll', handleScroll);
    return (): void => {
      customScroll?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const buns = useMemo<TIngredient[]>(
    (): TIngredient[] =>
      ingredients.filter((ingredient: TIngredient) => ingredient.type === 'bun'),
    [ingredients]
  );
  const sauces = useMemo<TIngredient[]>(
    (): TIngredient[] =>
      ingredients.filter((ingredient: TIngredient) => ingredient.type === 'sauce'),
    [ingredients]
  );
  const mains = useMemo<TIngredient[]>(
    (): TIngredient[] =>
      ingredients.filter((ingredient: TIngredient) => ingredient.type === 'main'),
    [ingredients]
  );

  function handleScroll(elementRef: RefObject<HTMLHeadingElement | null>): void {
    elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        <IngredientList name="Булки" ingredients={buns} ref={bunRef} />
        <IngredientList name="Начинки" ingredients={mains} ref={mainRef} />
        <IngredientList name="Соусы" ingredients={sauces} ref={sauceRef} />
      </div>
    </section>
  );
};
