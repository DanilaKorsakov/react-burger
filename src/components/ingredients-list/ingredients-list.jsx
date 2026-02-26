import { clsx } from 'clsx';

import { Ingredient } from '@components/ingredient/ingredient.jsx';

import styles from './ingredients-list.module.css';

export const IngredientList = ({ name, ingredients, ref }) => {
  return (
    <>
      <h2 className="text text_type_main-medium mb-6 " ref={ref}>
        {name}
      </h2>
      <ul className={`${styles.ingredients} ml-4`}>
        {ingredients.map((ingredient, index) => (
          <li
            key={ingredient._id}
            className={`${styles.ingredient} ${clsx(index % 2 === 0 && 'mr-6', ingredients.length > 2 && index < ingredients.length - 2 && 'mb-8')}`}
          >
            <Ingredient ingredient={ingredient} />
          </li>
        ))}
      </ul>
    </>
  );
};
