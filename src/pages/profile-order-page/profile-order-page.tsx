import { useEffect } from 'react';

import { useDispatch } from '@/hooks.ts';
import { ProfileFeedOrders } from '@components/profile-feed-orders/profile-feed-orders.tsx';
import { PROFILE_FEED_URL } from '@services/middleware/socket-middlware.ts';
import {
  wsProfileConnect,
  wsProfileDisconnect,
} from '@services/profile-feed/actions.ts';

export const ProfileOrderPage = (): React.JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsProfileConnect(PROFILE_FEED_URL));

    return (): void => {
      dispatch(wsProfileDisconnect());
    };
  }, []);

  return <ProfileFeedOrders />;
};
