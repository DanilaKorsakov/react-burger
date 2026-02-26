import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getIngredients } from '@services/ingredients/reducer.js';

export const useIngredient = () => {
  const ingredients = useSelector(getIngredients);
  const { id } = useParams();

  const ingredient = useMemo(() => {
    return ingredients.find((ingredient) => ingredient._id.toString() === id.toString());
  });

  return { ingredient };
};
