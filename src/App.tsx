import styles from './App.module.css';
import HeaderComponent from './components/Header/HeaderComponent';
import TodoCreate from './components/TodoCreate/TodoCreate';
import TodoList from './components/TodoList/TodoList';

function App() {
  return (
    <div className={styles.container}>
      <HeaderComponent/>
      <TodoCreate />
      <TodoList />
    </div>
  );
}

export default App;
