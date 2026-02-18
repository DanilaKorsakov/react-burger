import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import {
  changeIngredientPlace,
  deleteIngredient,
} from '@services/burger-constructor/reducer.js';

import styles from './constructor-ingredient.module.css';

export const ConstructorIngredient = ({ ingredient, index }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [, dragRef] = useDrag({
    type: 'constructorIngredient',
    item: { index, ingredient },
  });

  const [, constructorIngredientDrop] = useDrop({
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
    <div ref={ref}>
      <DragIcon type="primary" className={styles.icon_drag} />
      <ConstructorElement
        price={ingredient.price}
        text={ingredient.name}
        thumbnail={ingredient.image}
        type="normal"
        isLocked={false}
        handleClose={function fee() {
          dispatch(deleteIngredient(ingredient.key));
        }}
        extraClass={`ml-2 mb-4`}
      />
    </div>
  );
};
