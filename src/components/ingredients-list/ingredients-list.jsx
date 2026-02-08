import { clsx } from 'clsx';

import styles from './ingredients-list.module.css';

function IngredientList({ name, children, ingredients, ref }) {
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
            {children(ingredient)}
          </li>
        ))}
      </ul>
    </>
  );
}

export default IngredientList;
