import styles from '../../App.module.css';

const HeaderComponent = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.hh1}>TODO</h1>
      <div className={styles.theme}>
        <div>
          <img className={styles.icon} src="https://www.svgrepo.com/show/475382/sun-sunrise.svg" />
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
