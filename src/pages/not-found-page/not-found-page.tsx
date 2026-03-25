import { Logo } from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import styles from './not-found-page.module.css';

export const NotFoundPage = (): React.JSX.Element => {
  return (
    <>
      <Logo className={`${styles.icon} mt-30`} />
      <div className="text text_type_main-large mt-15">Увы, такой страницы нет</div>
      <div className="text text_type_main-default text_color_inactive mt-8">
        Можете вернуться на{' '}
        <Link className="link" to={'/'}>
          Главную страницу
        </Link>
      </div>
    </>
  );
};
