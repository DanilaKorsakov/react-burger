import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from '@/hooks.ts';
import { getIngredients } from '@services/ingredients/slice.js';

import type { TIngredient } from '@utils/types.ts';

type TUseIngredient = {
  ingredient: TIngredient | undefined;
};

export const useIngredient = (initialId?: string): TUseIngredient => {
  const ingredients = useSelector(getIngredients);
  const { id } = useParams();
  const ingredientId = useMemo<string | undefined>(() => {
    return initialId || id;
  }, []);

  const ingredient = useMemo<TIngredient | undefined>(() => {
    return ingredients.find(
      (ingredient: TIngredient) => ingredient._id.toString() === ingredientId?.toString()
    );
  }, []);

  return { ingredient };
};
