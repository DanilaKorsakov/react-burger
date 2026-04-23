import { clsx } from 'clsx';

import { Ingredient } from '@components/ingredient/ingredient.js';

import type { Ref } from 'react';

import type { TIngredient } from '@utils/types.ts';

import styles from './ingredients-list.module.css';

type IngredientListProps = {
  ingredients: TIngredient[];
  name: string;
  ref: Ref<HTMLHeadingElement>;
  type: string;
};

export const IngredientList = ({
  name,
  ingredients,
  ref,
  type,
}: IngredientListProps): React.JSX.Element => {
  return (
    <>
      <h2 className="text text_type_main-medium mb-6 " ref={ref}>
        {name}
      </h2>
      <ul className={`${styles.ingredients} ml-4`}>
        {ingredients.map((ingredient, index) => (
          <li
            key={ingredient._id}
            data-testid={`${type}-${index}`}
            className={`${styles.ingredient} ${clsx(index % 2 === 0 && 'mr-6', ingredients.length > 2 && index < ingredients.length - 2 && 'mb-8')}`}
          >
            <Ingredient ingredient={ingredient} index={index} />
          </li>
        ))}
      </ul>
    </>
  );
};
