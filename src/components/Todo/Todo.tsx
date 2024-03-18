import styles from './Todo.module.css';

type PropsTodoCreate = {
  text: string;
  setText: (text: string) => void;
  fetchTodo: (text: string) => void;
};

const Todo = ({ text, setText, fetchTodo }: PropsTodoCreate) => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.parent}>
          <input disabled type="checkbox" className={styles.rad} />
          <input
            className={styles.mainInp}
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Create a new todo"
          />
        </div>
        <button className={styles.btn} onClick={() => fetchTodo(text)}>+</button>
      </div>
    </div>
  );
};

export default Todo;
