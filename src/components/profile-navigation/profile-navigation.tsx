import { Button } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { NavLink, type Location } from 'react-router-dom';

import styles from './profile-navigation.module.css';

type TProfileNavigationProps = {
  location: Location;
  onClick: (() => void) | ((e: React.SyntheticEvent) => void) | undefined;
};

export const ProfileNavigation = ({
  location,
  onClick,
}: TProfileNavigationProps): React.JSX.Element => {
  return (
    <section className="mr-15">
      <nav>
        <ul className={styles.nav_menu}>
          <NavLink
            to={'/profile'}
            end
            className={({ isActive }) =>
              clsx(
                'text',
                'text_type_main-medium',
                styles.nav_link,
                isActive && styles.active
              )
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to={'/profile/orders'}
            end
            className={({ isActive }) =>
              clsx(
                'text',
                'text_type_main-medium',
                styles.nav_link,
                isActive && styles.active
              )
            }
          >
            История заказов
          </NavLink>
        </ul>
      </nav>
      <Button
        type="secondary"
        htmlType="button"
        extraClass={`mb-20 text text_type_main-medium ${styles.nav_link} ${styles.button_color}`}
        size="large"
        onClick={onClick}
      >
        Выход
      </Button>
      <div
        className={`${styles.profile_text} text text_type_main-default text_color_inactive`}
      >
        В этом разделе вы можете <br />{' '}
        {location.pathname === '/profile'
          ? 'изменить свои персональные данные'
          : location.pathname === '/profile/orders' &&
            'просмотреть свою историю заказов'}
      </div>
    </section>
  );
};
