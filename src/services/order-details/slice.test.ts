import { createOrder } from '@services/order-details/actions.ts';
import { initialState, orderDetailsSlice } from '@services/order-details/slice.ts';

describe('orderDetailsSlice test', () => {
  it('should return initial state', () => {
    expect(orderDetailsSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should return loading true while creating an order', () => {
    expect(
      orderDetailsSlice.reducer(undefined, { type: createOrder.pending.type })
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should return order number and name if order was created', () => {
    const payload = {
      order: {
        number: 1,
      },
      name: 'Бургер',
    };
    expect(
      orderDetailsSlice.reducer(undefined, { type: createOrder.fulfilled.type, payload })
    ).toEqual({
      ...initialState,
      order: {
        number: 1,
      },
      name: 'Бургер',
    });
  });

  it('should return error message if cant create an order', () => {
    expect(
      orderDetailsSlice.reducer(undefined, {
        type: createOrder.rejected.type,
        error: { message: 'cant create an order' },
      })
    ).toEqual({
      ...initialState,
      error: 'cant create an order',
    });
  });

  it('should return Unknown error if cant get error message', () => {
    expect(
      orderDetailsSlice.reducer(undefined, {
        type: createOrder.rejected.type,
        error: {},
      })
    ).toEqual({
      ...initialState,
      error: 'Unknown error',
    });
  });
});
