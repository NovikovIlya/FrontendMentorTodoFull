import styles from '../../App.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setChangeTheme } from '../../store/todoSlice';

const HeaderComponent = () => {
  const { theme } = useAppSelector((state) => state.todoSlice);
  const dispatch = useAppDispatch();

  const changeTheme = () => {
    dispatch(setChangeTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.hh1}>TODO</h1>
      <div className={styles.theme}>
        <div className={styles.btn} onClick={changeTheme}>
          {theme === 'light' ? (
            <img
              className={styles.icon}
              src="https://www.svgrepo.com/show/475382/sun-sunrise.svg"
            />
          ) : (
            <img className={styles.icon} src="https://www.svgrepo.com/show/287077/moon.svg" />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
