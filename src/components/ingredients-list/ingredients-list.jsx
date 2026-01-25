import { clsx } from 'clsx';

import Ingredient from '../ingredient/ingredient.jsx';

import styles from './ingredients-list.module.css';

function IngredientList({ name, ingredients }) {
  return (
    <>
      <h2 className="text text_type_main-medium mb-6 ">{name}</h2>
      <ul className={`${styles.ingredients} ml-4`}>
        {ingredients.map((ingredient, index) => (
          <li
            key={ingredient._id}
            className={`${styles.ingredient} ${clsx(index % 2 === 0 && 'mr-6', ingredients.length > 2 && index < ingredients.length - 2 && 'mb-8')}`}
          >
            <Ingredient
              image={ingredient.image}
              price={ingredient.price}
              name={ingredient.name}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default IngredientList;
