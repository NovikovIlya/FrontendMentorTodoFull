import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeData } from '../../store/todoSlice';
import { TodoItem as TodoItemProps } from '../../types/types';
import styles from './TodoItem.module.css';

const TodoItem = ({ id, title, completed }: TodoItemProps) => {
  const dispatch = useAppDispatch();
  const { sort } = useAppSelector((state) => state.todoSlice);
  const [tempCompleted, setTempCompleted] = useState(completed);

  const handleCheck = () => {
    setTempCompleted(!tempCompleted); // Обновление локального состояния
    dispatch(changeData({ id, completed: !tempCompleted })); // Отправка запроса на сервер
  };
  

  return (
    <div
      className={`${
        sort === 'completed' && completed === false
          ? styles.hidden
          : sort === 'active' && completed === true
          ? styles.hidden
          : sort === 'all'
          ? ''
          : ''
      } ${styles.container}`}>
      <div className={styles.parent}>
        <input className={styles.rad} type="checkbox" checked={tempCompleted} onChange={handleCheck} />
        <div>
          {tempCompleted ? (
            <div className={styles.mainInp} style={{ textDecoration: 'line-through' }}>
              {title}
            </div>
          ) : (
            <div className={styles.mainInp}>{title}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
