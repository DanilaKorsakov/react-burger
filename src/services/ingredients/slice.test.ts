import { loadIngredients } from '@services/ingredients/actions.ts';
import { ingredientsSlice, initialState } from '@services/ingredients/slice.ts';
import { ingredients } from '@utils/ingredients.ts';

describe('IngredientsSlice tests', () => {
  it('should return initial state', () => {
    expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should return state with ingredients after loading', () => {
    const loadedIngredients = ingredients;
    expect(
      ingredientsSlice.reducer(undefined, {
        type: loadIngredients.fulfilled.type,
        payload: loadedIngredients,
      })
    ).toEqual({
      ...initialState,
      loading: false,
      ingredients: loadedIngredients,
    });
  });

  it('should return error message if cant load ingredients', () => {
    expect(
      ingredientsSlice.reducer(undefined, {
        type: loadIngredients.rejected.type,
        error: { message: 'Failed to load ingredients' },
      })
    ).toEqual({
      ...initialState,
      error: 'Failed to load ingredients',
    });
  });

  it('should return unknown error message if error was without message', () => {
    expect(
      ingredientsSlice.reducer(undefined, {
        type: loadIngredients.rejected.type,
        error: {},
      })
    ).toEqual({
      ...initialState,
      error: 'Unknown error',
    });
  });

  it('should return state with loading true while loading ingredients', () => {
    expect(
      ingredientsSlice.reducer(undefined, {
        type: loadIngredients.pending.type,
      })
    ).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });
});
