import { useEffect } from 'react';
import styles from './TodoList.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteData, getData, setSort } from '../../store/todoSlice';
import TodoItems from '../TodoItem/TodoItem';
import { countItem } from '../../utils/CountItem';
import { TodoItem } from '../../types/types';

const TodoList = () => {
  const { todos = [], isError, isLoad } = useAppSelector((state) => state.todoSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const sortHandler = (sort: string) => {
    dispatch(setSort(sort));
  };

  const deleteHandler = async () => {
    const filterTodo = todos.filter((item) => item.completed === true);
    await dispatch(deleteData(filterTodo));
    await dispatch(getData());
  };

  return (
    <>
      {isLoad ? (
        <div>loading...</div>
      ) : isError ? (
        <div>error...</div>
      ) : todos.length > 0 ? (
        <div className={styles.container}>
          {todos.map((item: TodoItem) => (
            <TodoItems key={item.id} id={item.id} title={item.title} completed={item.completed} />
          ))}
          <div>
            <div>{countItem(todos)} item left</div>
            <div>
              <div onClick={() => sortHandler('all')}>All</div>
              <div onClick={() => sortHandler('active')}>Active</div>
              <div onClick={() => sortHandler('completed')}>Completed</div>
            </div>
            <div onClick={() => deleteHandler()}>Clear Completed</div>
          </div>
        </div>
      ) : (
        <div>No data...</div>
      )}
    </>
  );
};

export default TodoList;
