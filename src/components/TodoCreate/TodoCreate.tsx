import { useState } from 'react';
import { postData } from '../../store/todoSlice';
import { useAppDispatch } from '../../hooks/redux';
import styles from './TodoCreate.module.css';
import Todo from '../Todo/Todo';

const TodoCreate = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const fetchTodo = async (text: string) => {
    if (text === '') {
      alert('Please enter a task');
      return;
    }
    await dispatch(postData(text));
    setText('');
  };

  return (
    <div className={styles.container}>
      <Todo text={text} setText={setText} fetchTodo={fetchTodo} />
    </div>
  );
};

export default TodoCreate;
