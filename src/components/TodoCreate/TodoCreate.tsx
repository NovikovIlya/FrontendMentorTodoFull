import { useState } from 'react';
import { getData, postData } from '../../store/todoSlice';
import { useAppDispatch } from '../../hooks/redux';
import styles from './TodoCreate.module.css';
import Todo from '../Todo/Todo';

const TodoCreate = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const fetchTodo = async(text: string) => {
    await dispatch(postData(text));
    await dispatch(getData());
  };

  return (
    <div className={styles.container}>
      <Todo text={text} setText={setText} fetchTodo={fetchTodo} />
    </div>
  );
};

export default TodoCreate;
