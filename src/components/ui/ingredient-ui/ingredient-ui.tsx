import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef } from 'react';
import { Link, type Location } from 'react-router-dom';

import type { ConnectDragSource } from 'react-dnd';

import styles from './ingredient-ui.module.css';

type IngredientUiProps = {
  count: number;
  dragRef: ConnectDragSource;
  id: string;
  name: string;
  price: number;
  image: string;
  location: Location;
  type: string;
  index: number;
};

export const IngredientUi = ({
  count,
  dragRef,
  id,
  name,
  price,
  image,
  location,
  type,
  index,
}: IngredientUiProps): React.JSX.Element => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  useEffect(() => {
    if (linkRef.current) {
      dragRef(linkRef.current);
    }
  }, [dragRef]);

  return (
    <Link
      ref={linkRef}
      to={`/ingredients/${id}`}
      className={styles.ingredient}
      state={{ modalFrom: location }}
    >
      {count ? <Counter count={count} size="default" /> : null}
      <img src={image} alt={name} className="pr-4 pl-4" />
      <div className={`${styles.currency} mt-1 mb-1`}>
        <span
          className="text text_type_digits-default mr-2"
          data-testid={`${type}-${index}-price`}
        >
          {price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <div
        className={`${styles.name} text text_type_main-default`}
        data-testid={`${type}-${index}-name`}
      >
        {name}
      </div>
    </Link>
  );
};
