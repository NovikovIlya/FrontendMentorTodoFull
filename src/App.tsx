import styles from './App.module.css';
import TodoCreate from './components/TodoCreate/TodoCreate';
import TodoList from './components/TodoList/TodoList';

function App() {
  return (
    <div className={styles.container}>
      <TodoCreate />
      <TodoList />
    </div>
  );
}

export default App;
