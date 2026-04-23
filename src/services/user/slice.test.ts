import {
  changeUserData,
  login,
  logout,
  register,
  resetPassword,
} from '@services/user/actions.ts';
import {
  initialState,
  setError,
  setIsAuthChecked,
  setIsPasswordReset,
  setUser,
  userSlice,
} from '@services/user/slice.ts';

type MockAction = {
  typePrefix: string;
  fulfilled: { type: string };
  pending: { type: string };
  rejected: { type: string };
};

vi.mock('@services/user/actions', () => {
  const createMockAction = (prefix: string): MockAction => ({
    typePrefix: prefix,
    fulfilled: { type: `${prefix}/fulfilled` },
    pending: { type: `${prefix}/pending` },
    rejected: { type: `${prefix}/rejected` },
  });

  return {
    register: createMockAction('user/register'),
    login: createMockAction('user/login'),
    logout: createMockAction('user/logout'),
    resetPassword: createMockAction('user/resetPassword'),
    changeUserData: createMockAction('user/changeUserData'),
  };
});

const allActions = {
  register,
  login,
  logout,
  resetPassword,
  changeUserData,
};

describe('orderDetailsSlice test', () => {
  const user = {
    email: 'test@mail.ru',
    name: 'test',
  };

  it('should return initial state', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should return isPasswordReset value from payload', () => {
    expect(userSlice.reducer(initialState, setIsPasswordReset(true))).toEqual({
      ...initialState,
      isPasswordReset: true,
    });
  });

  it('should return error value from payload', () => {
    expect(userSlice.reducer(initialState, setError('error'))).toEqual({
      ...initialState,
      error: 'error',
    });
  });

  it('should return isAuthChecked value from payload', () => {
    expect(userSlice.reducer(initialState, setIsAuthChecked(true))).toEqual({
      ...initialState,
      isAuthChecked: true,
    });
  });

  it('should return user from server', () => {
    expect(userSlice.reducer(initialState, setUser(user))).toEqual({
      ...initialState,
      user: user,
    });
  });

  it('should return user and isAuthChecked true after registration', () => {
    expect(
      userSlice.reducer(undefined, { type: register.fulfilled.type, payload: user })
    ).toEqual({
      ...initialState,
      user: user,
      isAuthChecked: true,
    });
  });

  it('should return user and isAuthChecked true after login', () => {
    expect(
      userSlice.reducer(undefined, { type: login.fulfilled.type, payload: user })
    ).toEqual({
      ...initialState,
      user: user,
      isAuthChecked: true,
    });
  });

  it('should set user=null after logout', () => {
    expect(userSlice.reducer(undefined, { type: logout.fulfilled.type })).toEqual({
      ...initialState,
      user: null,
    });
  });

  it('should set isPasswordReset=null after resetPassword', () => {
    expect(userSlice.reducer(undefined, { type: resetPassword.fulfilled.type })).toEqual(
      {
        ...initialState,
        isPasswordReset: true,
      }
    );
  });

  it('should change user data after changeUserData success', () => {
    expect(
      userSlice.reducer(undefined, {
        type: changeUserData.fulfilled.type,
        payload: user,
      })
    ).toEqual({
      ...initialState,
      user: user,
    });
  });
});

describe('pending matcher', () => {
  it.each(Object.entries(allActions))(
    'should set loading=true',
    (_actionName, action) => {
      expect(
        userSlice.reducer(undefined, {
          type: action.pending.type,
        })
      ).toEqual({
        ...initialState,
        loading: true,
      });
    }
  );
});

describe('rejected matcher', () => {
  it.each(Object.entries(allActions))(
    'should set error message',
    (actionName, action) => {
      expect(
        userSlice.reducer(undefined, {
          type: action.rejected.type,
          error: { message: `${actionName} error` },
        })
      ).toEqual({
        ...initialState,
        error: `${actionName} error`,
      });
    }
  );

  it.each(Object.entries(allActions))(
    'should set Unknown error if cant get error message',
    (_actionName, action) => {
      expect(
        userSlice.reducer(undefined, {
          type: action.rejected.type,
          error: {},
        })
      ).toEqual({
        ...initialState,
        error: 'Unknown error',
      });
    }
  );
});
