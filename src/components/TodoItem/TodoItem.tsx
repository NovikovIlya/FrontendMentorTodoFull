import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeData, getData } from '../../store/todoSlice';
import { TodoItem as TodoItemProps } from '../../types/types';
import styles from './TodoItem.module.css';

const TodoItem = ({ id, title, completed }: TodoItemProps) => {
  const dispatch = useAppDispatch();
  const {sort} = useAppSelector((state) => state.todoSlice);
  
  const handleCheck = async () => {
    await dispatch(changeData({ id: id, completed: completed === true ? false : true }));
    dispatch(getData())
  };

  return (
    <div className={sort === 'completed' && completed === true ? styles.hidden : 
    sort === 'active' && completed === false ? styles.hidden : 
    sort === 'all' ? '' : ''}>
      <input type="checkbox" checked={completed} onChange={handleCheck} />
      <div>{title}</div>
    </div>
  );
};

export default TodoItem;
