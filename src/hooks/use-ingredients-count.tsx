import type { TFeedOrder } from '@utils/types.ts';

type TUseIngredientsCount = {
  ingredientsCount?: Map<string, number>;
};

export const useIngredientsCount = (order?: TFeedOrder): TUseIngredientsCount => {
  const ingredientsCount = new Map();
  order?.ingredients.forEach((id) => {
    ingredientsCount.set(id, (ingredientsCount.get(id) || 0) + 1);
  });

  return { ingredientsCount };
};
