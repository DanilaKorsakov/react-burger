import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { useDispatch } from '@/hooks.ts';
import {
  changeIngredientPlace,
  changeIngredientsOrder,
  deleteIngredient,
  revertIngredientPlaces,
} from '@services/burger-constructor/slice.ts';

import type { TIngredientWithOrder } from '@utils/types.ts';

import styles from './constructor-ingredient.module.css';

type ConstructorIngredientProps = {
  index: number;
  ingredient: TIngredientWithOrder;
};

export const ConstructorIngredient = ({
  index,
  ingredient,
}: ConstructorIngredientProps): React.JSX.Element => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement | null>(null);

  const [, dragRef] = useDrag<ConstructorIngredientProps, unknown, unknown>({
    type: 'constructorIngredient',
    item: { index, ingredient },
    end: (_item, monitor) => {
      if (monitor.didDrop()) {
        dispatch(changeIngredientsOrder());
      } else {
        dispatch(revertIngredientPlaces(monitor.getItem()));
      }
    },
  });

  const [, constructorIngredientDrop] = useDrop<
    ConstructorIngredientProps,
    unknown,
    unknown
  >({
    accept: 'constructorIngredient',
    hover: (item) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      dispatch(
        changeIngredientPlace({
          sourceIndex: dragIndex,
          destinationIndex: hoverIndex,
          ingredient: item.ingredient,
        })
      );

      item.index = hoverIndex;
    },
  });

  dragRef(constructorIngredientDrop(ref));

  return (
    <div ref={ref} data-testid={`drag-ingredient-${index}`}>
      <DragIcon type="primary" className={styles.icon_drag} />
      <ConstructorElement
        price={ingredient.price}
        text={ingredient.name}
        thumbnail={ingredient.image}
        isLocked={false}
        handleClose={function fee() {
          dispatch(deleteIngredient(ingredient.key));
          dispatch(changeIngredientsOrder());
        }}
        extraClass={`ml-2 mb-4`}
      />
    </div>
  );
};
