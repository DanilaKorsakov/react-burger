// import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
//
// import { FeedIngredient } from '@components/feed-ingredient/feed-ingredient.tsx';
//
// import styles from './feed-order.module.css';
//
// const orders = [1, 2, 3];
//
// export const FeedOrder = () => {
//   return (
//     <div className={`${styles.feed_order} p-6`}>
//       <div className={`${styles.order_flex} mb-6`}>
//         <div className="text text_type_digits-default">#034535</div>
//         <div className="text text_type_main-default text_color_inactive">
//           Сегодня, 16:20
//         </div>
//       </div>
//       <div className="text text_type_main-medium mb-6">
//         Death Star Starship Main бургер
//       </div>
//       <div className={styles.order_flex}>
//         <div className={styles.ingredients}>
//           {orders.map((order, index) => (
//             <FeedIngredient
//               key={index}
//               divStyles={{
//                 left: `${-16 * index}px`,
//                 zIndex: orders.length - index,
//               }}
//             />
//           ))}
//         </div>
//         <div className={styles.order_price}>
//           <div className="text text_type_digits-default mr-2">560</div>
//           <CurrencyIcon type="primary" />
//         </div>
//       </div>
//     </div>
//   );
// };
