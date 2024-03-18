import { useState } from 'react';
import { postData } from '../../store/todoSlice';
import { useAppDispatch } from '../../hooks/redux';
import styles from './TodoCreate.module.css';
import Todo from '../Todo/Todo';

const TodoCreate = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const fetchTodo = (text: string) => {
    dispatch(postData(text));
  };

  return (
    <div>
      {/* <div className={styles.container}>
        <input type="radio" />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Create a new todo"
        />
        <button onClick={() => fetchTodo(text)}>+</button>
      </div> */}
      <Todo text={text} setText={setText} fetchTodo={fetchTodo} />
    </div>
  );
};

export default TodoCreate;
