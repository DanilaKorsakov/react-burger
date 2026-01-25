import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients }) => {
  console.log(ingredients);

  return (
    <section className={`${styles.burger_constructor} ml-10`}>
      {/*<div className={`${styles.constructor_elements} ml-4`}>*/}
      {/*  {ingredients.map((ingredient) => (*/}
      {/*    <ConstructorElement*/}
      {/*      key={ingredient.id}*/}
      {/*      // handleClose={function fee() {}}*/}
      {/*      isLocked*/}
      {/*      price={ingredient.price}*/}
      {/*      text={ingredient.name}*/}
      {/*      thumbnail={ingredient.image}*/}
      {/*      type="top"*/}
      {/*      extraClass="mb-4"*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</div>*/}
    </section>
  );
};
