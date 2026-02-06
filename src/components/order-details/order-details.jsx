import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.css';

function OrderDetails() {
  return (
    <>
      <div className={` ${styles.blur} text text_type_digits-large mt-30`}>034536</div>
      <div className="text text_type_main-medium mt-8">идентификатор заказа</div>
      <CheckMarkIcon type="primary" className={`${styles.icon} mt-15 mb-15`} />
      <div className="text text_type_main-default mb-2">Ваш заказ начали готовить</div>
      <div className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </div>
    </>
  );
}

export default OrderDetails;
