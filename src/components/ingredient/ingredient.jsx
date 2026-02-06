import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import IngredientDetails from '@components/ingredient-details/ingredient-details';
import Modal from '@components/modal/modal';

import styles from './ingredient.module.css';

function Ingredient({ onAddPickedIngredients, ingredient, hasBun }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  function handleOpenModal() {
    setVisible(true);
  }

  function handleCloseModal() {
    setVisible(false);
  }

  const handleClick = () => {
    onAddPickedIngredients(ingredient);
    handleOpenModal();
    if (!hasBun) {
      setCount(count + 1);
    } else if (hasBun && ingredient.type !== 'bun') {
      setCount(count + 1);
    }
  };

  return (
    <>
      <div onClick={handleClick} className={styles.ingredient}>
        {count ? <Counter count={count} size="default" /> : null}
        <img src={ingredient.image} alt="ingredient" className="pr-4 pl-4" />
        <div className={`${styles.currency} mt-1 mb-1`}>
          <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <div className={`${styles.name} text text_type_main-default`}>
          {ingredient.name}
        </div>
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
    </>
  );
}

export default Ingredient;
