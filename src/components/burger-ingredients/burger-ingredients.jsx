import { Tab, Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  console.log(ingredients);

  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');

  const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <div className={`${styles.positions} mt-10 custom-scroll`}>
        <h2 className="text text_type_main-medium mb-6 ">Булки</h2>
        <div className={`${styles.ingredients_block} ml-4`}>
          {buns.map((bun, index) => (
            <div
              key={bun.id}
              className={`${styles.ingredient} ${index % 2 ? '' : 'mr-6'}`}
            >
              <Counter count={1} size="default" />
              <img src={`${bun.image}`} alt="ingredient" className="pr-4 pl-4" />
              <div className={`${styles.currency} mt-1 mb-1`}>
                <span className="text text_type_digits-default mr-2">{bun.price}</span>
                <CurrencyIcon type="primary" />
              </div>
              <div className={`${styles.name} text text_type_main-default`}>
                {bun.name}
              </div>
            </div>
          ))}
        </div>

        <h2 className="text text_type_main-medium mb-6 mt-10">Соусы</h2>
        <div className={`${styles.ingredients_block} ml-4`}>
          {sauces.map((sauce, index) => (
            <div
              key={sauce.id}
              className={`${styles.ingredient} ${index % 2 ? '' : 'mr-6'} ${sauces.length > 2 && index < sauces.length - 2 ? 'mb-8' : ''}`}
            >
              <Counter count={1} size="default" />
              <img src={`${sauce.image}`} alt="ingredient" className="pr-4 pl-4" />
              <div className={`${styles.currency} mt-1 mb-1`}>
                <span className="text text_type_digits-default mr-2">{sauce.price}</span>
                <CurrencyIcon type="primary" />
              </div>
              <div className={`${styles.name} text text_type_main-default`}>
                {sauce.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
