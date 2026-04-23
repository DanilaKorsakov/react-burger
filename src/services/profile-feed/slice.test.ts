import {
  initialState,
  onProfileConnecting,
  onProfileError,
  onProfileMessage,
  profileFeedSlice,
} from '@services/profile-feed/slice.ts';

describe('orderDetailsSlice test', () => {
  it('should return initial state', () => {
    expect(profileFeedSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should return isLoading true while connecting to ws', () => {
    expect(profileFeedSlice.reducer(initialState, onProfileConnecting())).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should return error if connect to ws was unsuccessful', () => {
    expect(
      profileFeedSlice.reducer(initialState, onProfileError('Something went wrong'))
    ).toEqual({
      ...initialState,
      error: 'Something went wrong',
    });
  });

  it('should return message from server if ws was connected', () => {
    expect(
      profileFeedSlice.reducer(
        initialState,
        onProfileMessage({
          success: true,
          orders: [
            {
              _id: '69e7344341cff5001b6e273b',
              ingredients: ['60666c42cc7b410027a1a9b1'],
              status: 'done',
              name: 'Краторный фалленианский экзо-плантаго бургер',
              createdAt: '2026-04-21T08:24:35.251Z',
              updatedAt: '2026-04-21T08:24:35.272Z',
              number: 649,
            },
          ],
          total: 1,
          totalToday: 0,
        })
      )
    );
  });
});
