import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import { useSelector } from '@/hooks.ts';
import { useGetOrderDetails } from '@hooks/use-get-order-details.js';
import { getOrderError, getOrderLoading } from '@services/order-details/reducer.js';

import iconPath from '../../assets/images/success.svg';

import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element => {
  const { order } = useGetOrderDetails();
  const loading = useSelector(getOrderLoading);
  const orderError = useSelector(getOrderError);

  return (
    <>
      {orderError ? (
        <div className={` ${styles.blur} text text_type_digits-large mt-30 mb-30`}>
          {orderError}
        </div>
      ) : loading ? (
        <div className={` ${styles.order_loading}`}>
          <Preloader />
        </div>
      ) : (
        order && (
          <>
            <div className={` ${styles.blur} text text_type_digits-large mt-30`}>
              {order.number}
            </div>
            <div className="text text_type_main-medium mt-8">идентификатор заказа</div>
            <img
              src={iconPath}
              className={`${styles.icon} mt-15 mb-15`}
              alt="Иконка успешного заказа"
            />
            <div className="text text_type_main-default mb-2">
              Ваш заказ начали готовить
            </div>
            <div className="text text_type_main-default text_color_inactive mb-30">
              Дождитесь готовности на орбитальной станции
            </div>
          </>
        )
      )}
    </>
  );
};
