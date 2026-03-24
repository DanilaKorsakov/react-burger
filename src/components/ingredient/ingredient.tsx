import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useLocation } from 'react-router-dom';

import { useSelector } from '@/hooks.ts';
import { IngredientUi } from '@components/ui/ingredient-ui/ingredient-ui.tsx';
import { getBun, getPickedIngredients } from '@services/burger-constructor/reducer.ts';

import type { TIngredient } from '@utils/types.ts';

type IngredientProps = {
  ingredient: TIngredient;
};

export const Ingredient = ({ ingredient }: IngredientProps): React.JSX.Element => {
  const pickedIngredients = useSelector(getPickedIngredients);
  const bun = useSelector(getBun);
  const [count, setCount] = useState(0);
  const location = useLocation();

  const [, dragRef] = useDrag<TIngredient, unknown, unknown>({
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
