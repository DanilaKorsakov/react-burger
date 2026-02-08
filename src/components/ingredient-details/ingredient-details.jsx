import styles from './ingredient-details.module.css';

function IngredientDetails({ image, name, calories, proteins, fat, carbohydrates }) {
  return (
    <>
      <img src={image} alt="ingredient image" className={styles.ingredient_image} />
      <div className="text text_type_main-medium mt-6 mb-8">{name}</div>
      <div className={`${styles.ingredient_details} mb-15`}>
        <div
          className={` ${styles.text_center} text text_type_main-default text_color_inactive mr-5`}
        >
          <div>Калории,ккал</div>
          <div>{calories}</div>
        </div>
        <div
          className={` ${styles.text_center} text text_type_main-default text_color_inactive mr-5`}
        >
          <div>Белки, г</div>
          <div>{proteins}</div>
        </div>
        <div
          className={` ${styles.text_center} text text_type_main-default text_color_inactive mr-5`}
        >
          <div>Жиры, г</div>
          <div>{fat}</div>
        </div>
        <div
          className={` ${styles.text_center} text text_type_main-default text_color_inactive mr-5`}
        >
          <div>Углеводы, г</div>
          <div>{carbohydrates}</div>
        </div>
      </div>
    </>
  );
}

export default IngredientDetails;
