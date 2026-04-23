import { useSelector } from '@/hooks.ts';
import { getIngredients } from '@services/ingredients/slice.ts';

import type { TFeedOrder } from '@utils/types.ts';

type TUseOrderPrice = {
  price?: number;
};

export const useOrderPrice = (order?: TFeedOrder): TUseOrderPrice => {
  const ingredients = useSelector(getIngredients);
  const getPriceById = (id: string): number => {
    const ingredient = ingredients.find((ingredient) => ingredient._id === id);
    return ingredient?.price || 0;
  };

  const price = order?.ingredients.reduce((sum, id) => {
    return sum + getPriceById(id);
  }, 0);

  return { price };
};
