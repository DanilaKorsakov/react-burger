import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from '@/hooks.ts';
import { getIngredients } from '@services/ingredients/reducer.js';

import type { TIngredient } from '@utils/types.ts';

type TUseIngredient = {
  ingredient: TIngredient | undefined;
};

export const useIngredient = (): TUseIngredient => {
  const ingredients = useSelector(getIngredients);
  const { id } = useParams();

  const ingredient = useMemo<TIngredient | undefined>(() => {
    return ingredients.find(
      (ingredient: TIngredient) => ingredient._id.toString() === id?.toString()
    );
  }, []);

  return { ingredient };
};
