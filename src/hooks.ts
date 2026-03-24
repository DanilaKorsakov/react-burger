import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';

import type { RootState, AppDispatch } from '@services/store.ts';

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
