import styles from './feed-status.module.css';

export const FeedStatus = (): React.JSX.Element => {
  const arr1 = [...Array(15).keys()];
  const arr2 = [...Array(6).keys()];
  return (
    <section className={`${styles.feed_status} ml-15`}>
      <div className={`${styles.orders_ids} mb-15`}>
        <div className="mr-9">
          <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
          <div className={styles.columns}>
            <div className="mr-4">
              {arr1.slice(0, 5).map((_item, index) => (
                <div
                  key={index}
                  className={`${styles.ready} text text_type_digits-default mb-2`}
                >
                  1234567890
                </div>
              ))}
            </div>
            <div>
              {arr1.length > 5 &&
                arr1.slice(5, 10).map((_item, index) => (
                  <div
                    key={index}
                    className={`${styles.ready} text text_type_digits-default mb-2`}
                  >
                    1234567890
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text text_type_main-medium mb-6">В работе:</h2>
          <div className={styles.columns}>
            <div className="mr-4">
              {arr2.slice(0, 5).map((_item, index) => (
                <div key={index} className={`text text_type_digits-default mb-2`}>
                  034538
                </div>
              ))}
            </div>
            <div>
              {arr2.length > 5 &&
                arr2.slice(5, 10).map((_item, index) => (
                  <div key={index} className={`text text_type_digits-default mb-2`}>
                    034538
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
      <div className={` ${styles.blur} text text_type_digits-large`}>28 752</div>

      <h2 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h2>
      <div className={` ${styles.blur} text text_type_digits-large`}>138</div>
    </section>
  );
};
