import { useIngredient } from '@hooks/use-ingredient.tsx';

import styles from './ingredient-details.module.css';

type IngredientDetailsProps = {
  header?: string;
};

export const IngredientDetails = ({
  header,
}: IngredientDetailsProps): React.JSX.Element => {
  const { ingredient } = useIngredient();

  return (
    <>
      {header && <div className="text text_type_main-large mt-30">{header}</div>}
      {ingredient && (
        <>
          <img
            src={ingredient.image}
            alt="ingredient image"
            className={styles.ingredient_image}
          />
          <div className="text text_type_main-medium mt-6 mb-8">{ingredient.name}</div>
          <div className={`${styles.ingredient_details} mb-15`}>
            <div
              className={` ${styles.text_center} text text_type_main-default text_color_inactive mr-5`}
            >
              <div>Калории,ккал</div>
              <div>{ingredient.calories}</div>
            </div>
            <div
              className={` ${styles.text_center} text text_type_main-default text_color_inactive mr-5`}
            >
              <div>Белки, г</div>
              <div>{ingredient.proteins}</div>
            </div>
            <div
              className={` ${styles.text_center} text text_type_main-default text_color_inactive mr-5`}
            >
              <div>Жиры, г</div>
              <div>{ingredient.fat}</div>
            </div>
            <div
              className={` ${styles.text_center} text text_type_main-default text_color_inactive mr-5`}
            >
              <div>Углеводы, г</div>
              <div>{ingredient.carbohydrates}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
