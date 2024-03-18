import styles from './Todo.module.css'

const Todo = ({ text, setText, fetchTodo }:any) => {


  

  return (
    <div>
      <div className={styles.container}>
        <input type="radio" />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Create a new todo"
        />
        <button onClick={() => fetchTodo(text)}>+</button>
      </div>
    </div>
  );
};

export default Todo;
