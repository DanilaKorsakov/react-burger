import { useSelector } from 'react-redux';

import { getOrderError, getOrder } from '@services/order-details/reducer.js';

import iconPath from '../../assets/images/success.svg';

import styles from './order-details.module.css';

function OrderDetails() {
  const order = useSelector(getOrder);
  const orderError = useSelector(getOrderError);
  return (
    <>
      {orderError ? (
        <div className={` ${styles.blur} text text_type_digits-large mt-30 mb-30`}>
          {orderError}
        </div>
      ) : (
        <>
          <div className={` ${styles.blur} text text_type_digits-large mt-30`}>
            {order.number}
          </div>
          <div className="text text_type_main-medium mt-8">идентификатор заказа</div>
          <img src={iconPath} className={`${styles.icon} mt-15 mb-15`} />
          <div className="text text_type_main-default mb-2">
            Ваш заказ начали готовить
          </div>
          <div className="text text_type_main-default text_color_inactive mb-30">
            Дождитесь готовности на орбитальной станции
          </div>
        </>
      )}
    </>
  );
}

export default OrderDetails;
