import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { getBun, getPickedIngredients } from '@services/burger-constructor/reducer.js';
import { getIngredientDetails } from '@services/ingredient/reducer.js';

import styles from './ingredient.module.css';

function Ingredient({ ingredient, onOpenModal }) {
  const dispatch = useDispatch();
  const pickedIngredients = useSelector(getPickedIngredients);
  const bun = useSelector(getBun);
  const [count, setCount] = useState(0);

  const [, dragRef] = useDrag({
    type: ingredient.type !== 'bun' ? 'ingredient' : 'bun',
    item: ingredient,
  });

  useEffect(() => {
    setCount(0);
    if (pickedIngredients.length > 0) {
      pickedIngredients.map((pickedIngredient) => {
        if (pickedIngredient._id === ingredient._id)
          setCount((prevState) => prevState + 1);
      });
    }
    if (bun && bun._id === ingredient._id) setCount((prevState) => prevState + 2);
  }, [pickedIngredients, bun]);

  const handleClick = () => {
    dispatch(getIngredientDetails(ingredient));
    onOpenModal();
  };

  return (
    <div onClick={handleClick} ref={dragRef} className={styles.ingredient}>
      {count ? <Counter count={count} size="default" /> : null}
      <img src={ingredient.image} alt={ingredient.name} className="pr-4 pl-4" />
      <div className={`${styles.currency} mt-1 mb-1`}>
        <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.name} text text_type_main-default`}>
        {ingredient.name}
      </div>
    </div>
  );
}

export default Ingredient;
