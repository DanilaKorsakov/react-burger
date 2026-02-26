import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { IngredientUi } from '@components/ui/ingredient-ui/ingredient-ui.jsx';
import { getBun, getPickedIngredients } from '@services/burger-constructor/reducer.js';

export const Ingredient = ({ ingredient }) => {
  const pickedIngredients = useSelector(getPickedIngredients);
  const bun = useSelector(getBun);
  const [count, setCount] = useState(0);
  const location = useLocation();

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

  return (
    <IngredientUi
      count={count}
      dragRef={dragRef}
      location={location}
      name={ingredient.name}
      price={ingredient.price}
      image={ingredient.image}
      id={ingredient._id}
    />
  );
};
